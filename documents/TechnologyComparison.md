# Comparison to Alternative Technologies

GitHub Actions was selected because it integrates directly with GitHub repository and has a fully managed infrastructure model. Other alternatives are Jenkins, GitLab CI, and Circle CI. Jenkins require setup, plugin management and ongoing server maintenance that adds unnecessary overhead for this project. In contrast, GitHub Actions is cloud-hosted and feels more seamless with built-in platform, which makes permissions control and automation easier.

For deployment, Amazon ECS Fargate was chosen instead of EC2, Render or Google Cloud Run. EC2 requires managing virtual machines configuration, operating system maintenance and manual scaling configuration, which increases operational complexity. Render is easier but offers less control over infrastructure configuration and deployment revisions. Google Cloud Run provides serverless container deployment similar to Fargate, but using it would introduce cross-cloud management complexity. This project already uses AWS services, so ECS Fargate provides better integration with IAM, networking and scaling policies within the AWS ecosystem. 

Amazon Elastic Container Registry (ECR) was selected over Docker Hub and GitHub Container Registry because of its integration with ECS and AWS Identity and Access Management (IAM). Docker Hub has rate limits and more focused on public images. Using ECR simplifies authentication, enhances security and maintains consistency within the AWS infrastucture.

# Trade-Off Analysis

In terms of scalability, ECS Fargate supports automatic scaling based on CPU and memory utilisation, which makes it more flexible than EC2. EC2 requires additional configuration like Auto Scaling Groups and continuous monitoring. Although Fargate may incur slightly higher compute costs compared to EC2, it reduces operational effort since no more server management is needed. This trade-off keeps infrastructure simpler and more manageable.

Another downside of using AWS-native services is vendor lock-in. Since services such as ECS, ECR and IAM are tightly integrated, this increases dependency on the AWS ecosystem and migrating to another cloud provider would require significant reconfiguration. However, the advantages of tight integration, scalability and operational simplicity provided by AWS was suitable for this project.
