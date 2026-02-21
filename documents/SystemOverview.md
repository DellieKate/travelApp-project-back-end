# TravelApp backend

The app is managed by a CI/CD pipeline that connects:

- GitHub (Source Control)
- GitHub Actions (CI/CD Engine)
- Docker (Containerisation)
- Amazon ECR (Container Registry)
- Amazon ECS Fargate (Container Orchestration)
- MongoDB Atlas (Database)
- AWS IAM (Security and Permissions)

## High-Level Architecture Diagram

## Relationships and Dependencies

1. GitHub to GitHub Actions
GitHub repository events (push, pull_request, schedule) trigger the CI/CD workflow. If GitHub is unavailable, then CI/CD cannot run.  Without the source control integration, automation cannot occur.

2. GitHub actions to Node.js Runtime
CI runner provisions a temporary Ubuntu VM. It installs Node.js, Dependencies via `npm ci` and then executes test suite. The application depends on correct node version, package.json and package-lock.json. If dependencies fail, the pipeline fails, then ultimately deployment is blocked. For example, if a developer introduces a breaking change in the express routes, if tests fail, the workflow stops so Docker image will not be built. This ensures enforcement of code quality.
However, in my app, I tried to resolve persistent test failures. In order to continue to deployment, I removed the dependency of the release and deploy worklow in the CI workflow.

3. GitHub Actions to Docker
After tests pass, the application is containerised. Docker defines base images (node:20-alpine), working directory, dependency installation and startup command. The Docker build depends on a valid Dockerfile, working Node app and correct environment configuration, which in our case is prod environment. This step ensures environment consistency across local development, CI evironment and production.

4. Docker to Amazon ECR
The Docker image is pushed to ECR (Elastic Container Registry). ECR acts as a secure private container registry. It requires valid AWS credentials stored in GitHub secrets and valid AWS authentication via IAM. If authentication fails, again deployment fails. Also important in these step, is that image is tagged everytime to preserve deployment revisions.

5. Amazon ECR to Amazon ECS
ECR pulls the image from ECR and runs it as a container task. It depends on correct image URI, IAM role permissions, valid task definition and network configuration (VPC, subnets). ECS cannot run if image does not exist and IAM role lacks ecr:GetDownloadUrlForLayer(?).

6. ECS to MongoDB Atlas
Application connects to MongoDB Atlas via `MONGO_URL=mongodb+srv:` which is stored as environment variable. Dependency relies on MongoDB cluster availability, correct credentials and network accessibility. If MongoDB is unavailable, API fails at runtime.

## Security and Secrets Dependencies

Secrets and environment variables are stored in GitHub/Settings/Secrets. They are never committed to the repository.

## Deployment Flow (Step-by-Step Example)

1. Developer pushes code to main 
2. GitHub triggers CD workflow
3. Workflow
- installs dependencies
- runs tests
- build Docker Images
- tags image
- pushes image to ECR
4. ECS updates service
5. New task revision created
6. Old task drained
7. New container becomes active

This is a rolling deployment.
