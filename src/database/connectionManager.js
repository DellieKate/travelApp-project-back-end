
import mongoose from "mongoose";

console.log("DB Connection Env", process.env.NODE_ENV)

if (process.env.NODE_ENV === "test") {
  DatabaseUri = process.env.MONGO_URL_TEST || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/travelApp_test"
} else if (process.env.NODE_ENV == "dev" || process.env.NODE_ENV == "development") {
  DatabaseUri = process.env.MONGO_URL_DEV
} else 
  DatabaseUri = process.env.MONGO_URL_PROD || process.env.MONGO_URL;

if (!DatabaseUri) {
  throw new Error ("Database URI is not set! Please define which to database to use.");
}

async function dbConnect(){
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds between retries
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Database connection attempt ${attempt}/${maxRetries}`);
      console.log("Connecting to database: " + DatabaseUri);
      
      // Connection options for better reliability
      await mongoose.connect(DatabaseUri, {
        serverSelectionTimeoutMS: 30000,  // 30 seconds to select server
        socketTimeoutMS: 45000,           // 45 seconds for socket operations
        connectTimeoutMS: 30000,          // 30 seconds to establish connection
        maxPoolSize: 10,                  // Maximum number of connections
        bufferMaxEntries: 0,              // Disable mongoose buffering
        retryWrites: true,                // Retry failed writes
        retryReads: true                  // Retry failed reads
      });
      
      console.log("Database connected successfully!");
      
      // Test the connection
      await mongoose.connection.db.admin().ping();
      console.log("Database ping successful!");
      
      return; // Success - exit the retry loop
      
    } catch (error) {
      console.error(`Database connection attempt ${attempt} failed:`, error.message);
      console.error("Full error:", JSON.stringify(error, null, 2));
      
      if (attempt === maxRetries) {
        console.error(`Failed to connect to database after ${maxRetries} attempts`);
        throw new Error(`Database connection failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      console.log(`Retrying database connection in ${retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
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
