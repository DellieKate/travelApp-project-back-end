// Database-related utilities,
// such as connecting, disconnecting, seeding, and deleting from the database

import mongoose from "mongoose";

async function dbConnect(){
    try {
        let targetDatabaseUrl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/TravelAppDatabase";
        console.log("Connecting to database: " + targetDatabaseUrl);
        await mongoose.connect(targetDatabaseUrl);
        console.log("Database connected!");
    } catch (error) {
        console.log("Database connection failed!\n" + JSON.stringify(error));
    }
}

async function dbCLose() {
    await mongoose.connection.close();
    console.log("Database disconnected!");    
}

export {
    dbConnect,
    dbCLose
}