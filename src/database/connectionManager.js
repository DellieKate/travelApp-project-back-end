
import mongoose from "mongoose";

async function dbConnect(){
  try {
      let DatabaseUri = process.env.MONGO_URI|| "mongodb://mongo:27017/travelApp-project-backend";
      // "mongodb://127.0.0.1:27017/TravelAppDatabase";
      console.log("Connecting to database: " + DatabaseUri);
      await mongoose.connect(DatabaseUri);
      console.log("Database connected!");
  } catch (error) {
      console.log("Database connection failed!\n" + JSON.stringify(error));
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
