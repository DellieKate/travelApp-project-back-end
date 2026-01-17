import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server.js";
import { UserModel } from "../database/entities/User.js";

jest.setTimeout(20000);

describe("User API Endpoints", () => {
  let userId;
  const testUser = {
    username: "charlisse",
    email: "charlisse@example.com",
    password: "Password123",
    citizenship: "Australia"
  };

  beforeAll(async () => {
    const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB";
    await mongoose.connect(MONGO_URL);
  });

  afterAll(async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.dropDatabase();
    }
  } finally {
    await dbClose();
  }
});


  test("POST /users/register - register a new user", async () => {
    const response = await request(app)
      .post("/users/register")
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.user).toHaveProperty("_id");
    userId = response.body.user._id;
  });

  test("POST /users/login - login with correct credentials", async () => {
    const response = await request(app)
      .post("/users/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
    expect(response.body.user._id).toBe(userId);
  });

  test("GET /users/one/:userId - retrieve single user", async () => {
    const response = await request(app)
      .get(`/users/one/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("_id", userId);
    expect(response.body.user.username).toBe(testUser.username);
  });

  test("PATCH /users/one/:userId - update user info", async () => {
    const response = await request(app)
      .patch(`/users/one/${userId}`)
      .send({ username: "charlisseUpdated" });

    expect(response.status).toBe(200);
    expect(response.body.updatedUser.username).toBe("charlisseUpdated");
  });

  test("DELETE /users/one/:userId - delete user", async () => {
    const response = await request(app)
      .delete(`/users/one/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted successfully!");
  });
});
