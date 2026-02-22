# How the CI/CD Process Works

The pipeline is separated into clear stages: **CI, Release and Deploy**. This separation keeps responsibilities clear and makes the workflow easier to manage and debug.

1. **Continuous Integration (CI)**

![CI](./workflows/CI%20sample.png)

![travelapp_CI](./workflows/CI%20workflow.png)


- GitHub to GitHub Actions
- GitHub actions to Node.js Runtime

The CI workflow runs when code is pushed to `revision4` branch, a pull request is opened and a weekly cron schedule runs.
When triggered, GitHub actions provides a temporary Ubuntu runner. If GitHub is unavailable, CI/CD cannot run.  Automation fully depends on source control integration.

What happens:
  A MongoDB service container (`mongo:6`) starts so tests can run against a real database. The runner installs Node.js and dependencies using `npm ci`. Application depends on a valid `package.json`. Then the test database is seeded using `npm run seed-test`. Jest tests run with coverage reporting. These reports, including JUnit test results, are uploaded as artifacts. A Docker Compose verification phase builds and runs services briefly to simulate production behavior, then shuts them down.

This stage ensures code quality before anything is released. If tests fail, the pipeline should stop and prevent further stages from executing.

2. **Release and Version Tagging**

![CD](./workflows/CD%20sample.png)
![travelapp_CD](./workflows/CD%20workflow.png)

- GitHub Actions to Docker
- Docker to Amazon ECR

This workflow is triggered using `workflow_run` after CI completes.

Inside this stage, version is automatically bumped using semantic versioning (e.g. `travelApp-v1.2.3`). Using Buildx, a production Docker image is built. Then image is pushed to GitHub Container Registry (GHCR) with the version tag and the `latest` tag. Finally, a GitHub Release entry is created automatically.
Tagging every image ensures deployment revisions are preserved. If a production issue occurs, an earlier version can be redeployed safely.

3. **Deployment to AWS ECS**

- Amazon ECR to Amazon ECS
- ECS to MongoDB Atlas

The deployment job runs after the Release job completes successfully.

It is achieved by configuring AWS credentials using stored secrets. Then image is pulled from GHCR, tagged and pushed into ECR using task definition. It depends on correct image URI, IAM role permissions, valid cluster and service configuration, and proper VPC and subnet networking. Then ECS creates a new task revision. A rolling deployment occurs where old tasks are drained while new tasks start. If image does not exist or permissions are incorrect, the service cannot start.

Deployment metadata (image tag, commit SHA, timestamp, environment) is saved as an artifact. This improves traceability and audit capability.

** Application connects to MongoDB Atlas using `MONGO_URL=mongodb+srv:`, stored in environment variables. If MongoDB is unavailable, API fails at runtime.

## Deployment Flow (Step-by-Step Example)

![CD2](./workflows/AWS%20%20ECS%20Fargate.png)

1. Developer pushes code to revision4

2. CI workflow runs:

- installs dependencies
- seeds database
- runs tests
- upload artifacts
- verifies Docker Compose

3. Release workflow:

- bumps version
- build Docker image
- tags and pushes image
- create GitHub release

4. Deployment workflow:
  
- transfers image to ECR
- updates ECS task definition
- creates task revision
- performs rolling update

5. New container becomes active while old container is drained

## Security and Secrets Dependencies

All AWS credentials, database URLs, and tokens are stored securely in GitHub Secrets. They are never committed to the repository. IAM roles control permissions between services.

Images Resource:
1. Cois, Aaron (2015). Continuous integration in DevOps.(https://www.sei.cmu.edu/blog/continuous-integration-in-devops/)
2. Munoz, Alvaro (2023). Build and Push Docker Image to AWS ECR. (https://plainenglish.io/blog/build-push-docker-image-to-aws-ecr-using-github-actions)
3. Jain, Vibhor (2024). Exploring Deployment of Node.js application to ECS Fargate. (https://www.linkedin.com/pulse/exploring-deployment-nodejs-application-aws-ecs-fargate-vibhor-jain-phvfc)