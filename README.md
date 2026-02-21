# TravelApp Backend

Repo: https://github.com/DellieKate/travelApp-project-back-end

Back End Deployment Links:

- **Render**: https://travelapp-project-back-end.onrender.com
- **AWS Fargate**: http://travelapp-balancer-2100525416.ap-southeast-2.elb.amazonaws.com

This project is part of a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to explore cities, activities, and travel essentials for different countries. It includes features for creating, reading, updating and deleting (CRUD) travel-related data.

# Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
    - [Software and Packages](#software-and-packages)
    - [Hardware requirements](#hardware-requirements)
    - [Alternatives & Comparison](#alternatives--comparison)
    - [Licensing](#licensing)
3. [Code Style and Conventions](#code-style-and-conventions)
4. [Installation and Setup](#installation-and-setup)
5. [Database Seeding](#database-seeding)
6. [Usage](#usage)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Deployment](#deployment)
9. [Alternative Technologies for Deployment](#alternative-technologies-for-deployment)

# Project Overview

**TravelApp** simplifies travel planning by allowing users to:

- Explore cities, their best visiting months and weather.
- Discover country-specific activities and packing essentials.
- Maintain up-to-date travel information through CRUD operations.

The application uses MERN stack architecture with RESTful APIs. A responsive REACT frontend is in progress.

[back](#top)

# Technologies Used

## Software and Packages

1. **MongoDB**, a NoSQL document-based database that allows flexible schema design for varying travel-related data. Scalable and widely used in web applications like Uber and ebay.
2. **Express.js** provides a lightweight backend framework optimized for REST APIs. It is an industry standard in Node.js apps, supported by a massive open-source community.
3. **Node.js** ensures high-performance, event-driven backend execution ideal for real-time web applications. Industry standard for Javascript backend and used by Netflix and Paypal.
4. **Mongoose**, an ODM (Object Data Modeling) library for MongoDB, simplifies data modeling and validation. Commonly used in production-grade Node.js applications.
5. **bcrypt** handles secure password storage with industry standard hashing algorithms.
6. **CORS** enables controlled access to the API from various client applications.
7. **Helmet** protects against common web vulnerabilites by setting appropriate security headers.
8. **jsonwebtoken** manages token based authentication for secure and scalable user sessions.
9. **jest** provides testing framework for comprehensive unit and integration testing. Most popular testing framework.
10. **supertest** facilitates HTTP assertion testing to verify API endpoints. Commonly paired with Jest.

[back](#top)

## Hardware Requirements

- Minimum: 4GB RAM, dual-core CPU, 10GB free disk space
- Recommended: 8GB+ RAM, quad-core CPU, SSD storage for faster build times
- Internet connection for API calls and package installation

[back](#top)

## Alternatives & Comparison

1. **Database:** MongoDB vs PostgreSQL, MySQL
    - MongoDb is schema-less, making it ideal for evolving data models, while PostgreSQL is relational and  enforces strict schemas.

2. **Backend:** Express.js vs Koa.js
    - Express has more community support and middleware libraries. Koa is more minimal but requires more setup.

3. **Language** Node.js vs Python(Flask/Django)
    - Node.js provides a single-language environment (JavaScript), unlike Python which uses multi-language method.

4. **Testing** Jest + Supertest vs Mocha/Chai
    - Easier to setup with ES modules.

[back](#top)

## Licensing

1. MongoDB - server side public license (SSPL)
2. Express.js, Node.js, Mongoose, bcrypt, CORS, Helmet, JWT, Jest, Supertest - MIT License

All technologies used are open-source with permissive licenses that allow reuse, modification and distribution.

[back](#top)

# Code Style and Conventions

The project applies consistent code style and conventions across all files (Airbnb's Javascript Style Guide).

- **ES6 modules:** import/export syntax used consistently
- **Naming Conventions:**
        - camelCase for variables and functions (getOneCityByID)
        - PascalCase for models (CityModel)
- **Formatting:** Prettier/ESLint rules applied to maintain spacing, indentation and semicolons
- **Async/Await:** Ascynchronous operations consistently handled
- **DRY Principle:** Reusable functions used for CRUD operations

This ensures readable, maintainable and scalable code with no breaches in coding standards.

[back](#top)

# Installation and Setup

1. Clone the repository

    `git clone https://github.com/DellieKate/travelApp-project-back-end`

    `cd travelApp`

2. Install dependencies

    `npm install`

3. Start server

    `npm start`

[back](#top)

# Database Seeding

Seed the database with initial travel data:

   `npm run seed`

   `npm run seed-test` - for CI/CD testing environment

This populates cities, countries, activities, and packing essentials.

[back](#top)

# Usage

- Access API at `http://localhost:3000`and interact with resources:

## Cities

Description              | Methods    |     Endpoint
------------------------ |----------  |----------------------------------
Create a new city        | POST       | /cities/
Get all cities           | GET        | /cities/
Get a single city by Id  | GET        | /cities/<int:cities_id>
Update city              | PATCH      | /cities/<int:cities_id>
Delete city              | DELETE     | /cities/<int:cities_id>

## Countries

Description                    | Methods    |     Endpoint
------------------------------ |----------  |----------------------------------
Create a new country           | POST       | /countries/
Get all countries              | GET        | /countries/
Get a single country by Id     | GET        | /countries/<int:countries_id>
Update country details         | PATCH      | /countries/<int:countries_id>
Delete country record          | DELETE     | /countries/<int:countries_id>

## Vaccination Requirements (VaxReq)

        Endpoint                              
|-----------------------------|

/vax/
/vax/<int:vax_id>

## Activities

       Endpoint                              
|-----------------------------|

/activities/
/activities/<int:activities_id>

## PackingEssentials

        Endpoint                              
|-----------------------------|

/packing/
/packing/<int:packing_id>

## WishList

        Endpoint                              
|-----------------------------|

/wishlist/
/wishlist/<int:wishlist_id>

## Users

        Endpoint                              
|-----------------------------|

/users/
/users/<int:users_id>

[back](#top)

# CI/CD Pipeline

**Triggers**

    - Push to `revision4` branch
    - Pull requests on any branch
    - Scheduled weekly (Monday 04:19 UTC)

**Workflow Overview**

    - Workflow is fully discussed here. [Workflow](/documents/WorkflowOverview.md) 

**Security and Secrets**

All secrets stored in Github secrets (AWS credentials, GHCR token) including environment variables used for dynamic configuration.

[back](#top)

# Deployment

    1. **MondoDB Atlas**: Cloud Database for all travel data
    2. **Render**: Cloud backend hosting
    3. **AWS Fargate**: Container orchestration will rolling deployments
    4. **ECS Tasks**: New revisions deployed, old tasks drained, service updated automatically

[back](#top)

# Alternative Technologies for Deployment 

    - Comparisons are discussed here. [Workflow](/documents/TechnologyComparison.md) 

[back](#top)