# TravelApp Backend Project

Repo link: https://github.com/DellieKate/travelApp-project-back-end 

Back End Deployment link: https://travelapp-project-back-end.onrender.com
                   

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
7. [Deployment](#deployment)



# Project Overview

**TravelApp** is designed to simplify travel planning by allowing vax to:
- Explore cities and their best visiting months and weather.
- See country-specific activities and packing essentials.
- Maintain up-to-date travel information through CRUD operations.

The application follows modern MERN stack architecture with a RESTful API backend and a responsive REACT frontend (development in progress.)



# Technologies Used

## Software and Packages
1. **MongoDB**, a NoSQL database, allows flexible schema design for varying travel data. Scalable and widely used in web applications.
2. **Express.js** provides a lightweight backend framewrok optimized for REST APIs. It is an industry standard in Node.js apps.
3. **Node.js** ensures high-performance, event-driven backend execution. Industry standard for Javascript backend.
4. **Mongoose**, a ODM (Object Data Modeling) for MongoDB, simplifies data modeling and validation.
5. **bcrypt** handles secure password storage with industry standard hashing algorithms.
6. **CORS** enables controlled access to the API from various client applications.
7. **Helmet** protects against common web vulnerabilites bby setting appropriate security headers.
8. **jsonwebtoken** manages token based authentication, improving scalability.
9. **jest** provides testing framework for comprehensive unit and integration testing.
10. **supertest** facilitates HTTP assertion testing to verify API endpoints.

## Hardware Requirements
- Minimum: 4GB RAM, dual-core CPU, 10GB free disk space
- Recommended: 8GB+ RAM, quad-core CPU, SSD storage for faster development
- Internet connection for API calls and package installation

## Alternatives & Comparison
1. **Database:** MongoDB vs PostgreSQL, MySQL
    - MongoDb is schema-less, making it ideal for evolving travel data, while PostgreSQL is relational and  enforces strict schemas.

2. **Backend:** Express.js vs Koa.js
    - Express has more community support and middleware libraries. Koa is more minimal but requires more setup.

## Licensing
All used technologies are open-source with permissive licenses (mainly MIT; MongoDB is server-side license).



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



# Installation and Setup
1. Clone the repository

    `git clone https://github.com/DellieKate/travelApp-project-back-end`

    `cd travelApp`

2. Install dependencies

    `npm install`

3. Start server

    `npm start`



# Database Seeding
Seed the database with initial travel data:
    
   `npm run seed`

This populates cities, countries, activities, and packing essentials.



# Usage
- Access `http://localhost:3000` 
- Use the REST API endpoints to fetch, create, update or delete travel data: 

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

## VaxReq

        Endpoint                              
-----------------------
/vax/   
/vax/<int:vax_id>    
 - same methods (POST, GET, PATCH, DELETE)

## Activities

        Endpoint                              
-----------------------
/activities/   
/activities/<int:activities_id> 
 - same methods (POST, GET, PATCH, DELETE)

## PackingEssentials

        Endpoint                              
-----------------------
/packing/   
/packing/<int:packing_id>    
- same methods (POST, GET, PATCH, DELETE)

## WishList

        Endpoint                              
-----------------------
/wishlist/   
/wishlist/<int:wishlist_id>    
- same methods (POST, GET, PATCH, DELETE)

## Users

        Endpoint                              
-----------------------
/users/   
/users/<int:users_id>    
- same methods (POST, GET, PATCH, DELETE)


# Deployment

1. The app uses **MongoAtlas**, a fully managed cloud database, to store and manage all travel data. 

2. The backend server is hosted on **Render**, a cloud-based hosting platform that offers continuous deployment and automatic scaling.
