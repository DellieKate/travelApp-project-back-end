
import mongoose from "mongoose";

let DatabaseUri;

console.log("Env", process.env.NODE_ENV)

if (process.env.NODE_ENV == "test") {
  console.log("Here???", process.env.MONGO_URL_TEST)
  DatabaseUri = process.env.MONGO_URL_TEST
} else if (process.env.NODE_ENV == "dev") {
  DatabaseUri = process.env.MONGO_URL_DEV
} else {
  DatabaseUri = process.env.MONGO_URL_PROD
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
