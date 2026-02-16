import { dbConnect } from "./database/connectionManager.js";
import { app } from "./server.js";

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  // Start server first for health checks
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`The server is running in port: ${PORT}`);
  });

  // Connect to database after server starts
  dbConnect()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
}

