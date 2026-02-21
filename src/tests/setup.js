import mongoose from "mongoose";

beforeAll(async () => {
  process.env.JWT_SECRET = "testsecret123";
  const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB";
  await mongoose.connect(MONGO_URL);
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
});