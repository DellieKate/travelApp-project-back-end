# High Level Architecture Overview

User traffic flows through DNS and AWS networking before reaching containerised application services.

![AWS](./workflows/DevOps%20flow.png)

![UserAccess](./workflows/AWS%20architecture.png)

1. User accesses travelapp.com (DNS name still pending, so use public DNS name)
2. Amazon Route 53 resolves the domain to the Application Load Balancer.
3. The load balancer forwards traffic to a target group
4. The target group routes traffic to healthy ECS Fargate tasks
5. Node.js container processes the request
6. The application connects to MongoDB Atlas using secure environment variables
7. The response returns through the load balancer to the user.

The application is deployed in:

- AWS region: ap-southeast-2
- VPC
- Three public subnets across multiple availability zones
- Security group
- Auto-assign public IP: enabled

ECS configuration:

- cluster
- service
- Launch type: Fargate
- Deployment strategy: Rolling update
- Managed tabs: enabled

Task definition includes:

- travelapp-container (Node.js backend API)
- seeder (database initialisation)
- mongodb (containerised database for internal use)

Image Source:

Kumar, Marun (1983). Step-by-step Guide. (https://dev.to/aws-builders/step-by-step-guide-highly-available-architecture-with-alb-and-amazon-ecs-on-aws-fargate-cgi)