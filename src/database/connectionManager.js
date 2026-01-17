
import mongoose from "mongoose";

let DatabaseUri;

if (process.env.JEST_WORKER_ID) {
  // Running in Jest, use test DB
  DatabaseUri = process.env.TEST_DATABASE_URL || (process.env.IS_CI
    ? "mongodb://127.0.0.1:27017/travelApp_test" : "mongodb://127.0.0.1:27017/travelApp_test");
} else if (process.env.IS_DOCKER === "true") {
  // Running in Docker, use mongo service
  DatabaseUri = process.env.MONGO_URI || "mongodb://mongo:27017/travelApp-project-backend";
} else {
  // Local development
  DatabaseUri = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/travelApp-project-backend";
}

async function dbConnect(){
  try {
      console.log("Connecting to database: " + DatabaseUri);
      await mongoose.connect(DatabaseUri);
      console.log("Database connected!");
  } catch (error) {
      console.log("Database connection failed!\n" + JSON.stringify(error));
      throw error;
  }
};


async function dbClose() {
  await mongoose.connection.close();
  console.log("Database disconnected!");    
};

export {
  dbConnect,
  dbClose
};
