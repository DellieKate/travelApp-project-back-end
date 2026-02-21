# TravelApp backend

It is managed by through a CI/CD pipeline that connects several modern DevOps tools into one automated flow. The main technologies are

- GitHub - stores the source code
- GitHub Actions - runs the automation workflows
- Docker - packages the application into containers
- Amazon Elastic Container Registry (ECR) - stores Docker Images
- Amazon ECS with Fargate (serverless) - run containers in the cloud
- MongoDB Atlas - database service
- AWS Identity and Access Management (IAM) - manages secure access

## How the CI/CD Process Works

The pipeline is separated into three clear stages: **CI, Release and Deploy**. This separation keeps responsibilities clear and makes the workflow easier to manage and debug.

1. **Continuous Integration (CI)**

 - GitHub to GitHub Actions
 - GitHub actions to Node.js Runtime

The CI workflow runs when code is pushed to `revision4` branch, a pull request is opened and a weekly cron schedule runs.
When triggered, GitHub actions provides a temporary Ubuntu runner. If GitHub is unavailable, CI/CD cannot run.  Automation fully depends on source control integration.

What happens:
  A MongoDB service container (`mongo:6`) starts so tests can run against a real database. The runner installs Node.js and dependencies using `npm ci`. Application depends on a valid `package.json`. Then the test database is seeded using `npm run seed-test`. Jest tests run with coverage reporting. These reports, including JUnit test results, are uploaded as artifacts. A Docker Compose verification phase builds and runs services briefly to simulate production behavior, then shuts them down.

This stage ensures code quality before anything is released. If tests fail, the pipeline should IDEALLY stop and prevent further stages from executing. In practice, during development, the dependency between CI and release was temporarily relaxed to allow deployment testing while resolving persistent test failures.

2. **Release and Version Tagging**

  - GitHub Actions to Docker
  - Docker to Amazon ECR

This workflow is triggered using `workflow_run` after CI completes.

Inside this stage, the version is automatically bumped using semantic versioning (e.g. `travelApp-v1.2.3`). Using Buildx, a production Docker image is built. This image is pushed to GitHub Container Registry (GHCR) with the version tag and the `latest` tag. Finally, a GitHub Release entry is created automatically.
Tagging every image ensures deployment revisions are preserved. If a production issue occurs, an earlier version can be redeployed safely.

3. **Deployment to AWS ECS**

  - Amazon ECR to Amazon ECS
  - ECS to MongoDB Atlas

The deployment job runs after the Release job completes successfully.

It is achieved by configuring AWS credentials using stored secrets. Then image is pulled from GHCR, tagged and pushed into ECR using task definition. It depends on correct image URI, IAM role permissions, valid cluster and service configuration, and proper VPC and subnet networking. Then ECS creates a new task revision. A rolling deployment occurs where old tasks are drained while new tasks start. If image does not exist or permissions are incorrect, the service cannot start.

Deployment metadata (image tag, commit SHA, timestamp, environment) is saved as an artifact. This improves traceability and audit capability.

** Application connects to MongoDB Atlas using `MONGO_URL=mongodb+srv:`, stored in environment variables. If MongoDB is unavailable, API fails at runtime.

## Security and Secrets Dependencies

All AWS credentials, database URLs, and tokens are stored securely in GitHub Secrets. They are never committed to the repository. IAM roles control permissions between services.

## Deployment Flow (Step-by-Step Example)

1. Developer pushes code to revision4 
2. CI workflow runs:
  - installs dependencies
  - seeds database
  - runs tests
  - upload artifacts
  - verifies Docker Compose
4. Release workflow:
  - bumps version
  - build Docker image
  - tags and pushes image 
  - create GitHub release
5. Deployment workflow:
  - transfers image to ECR
  - updates ECS task definition
  - creates task revision
  - performs rolling update
6. New container becomes active while old container is drained.


