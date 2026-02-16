import { dbConnect } from "./database/connectionManager.js";
import { app } from "./server.js";

const PORT = process.env.PORT || 3000; 

if (process.env.NODE_ENV !== "test") {
// 1. Connect to the database
  dbConnect().then(() => {

// 2. Activate the Express server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`The server is running in port: ${PORT}`);
    });
  });
}


