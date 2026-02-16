import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server.js";
import { UserModel } from "../database/entities/User.js";

jest.setTimeout(20000);

describe("User API Endpoints", () => {
  let userId;
  const testUser = {
    name: "charlisse",
    email: "charlisse@example.com",
    password: "Password123",
    citizenship: "Australia"
  }

  beforeAll(async () => {
    process.env.JWT_SECRET = "testsecret123";
    const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB";
    await mongoose.connect(MONGO_URL);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
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

  test("GET /users/:userId - retrieve single user", async () => {
    const response = await request(app)
      .get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("_id", userId);
    expect(response.body.user.name).toBe(testUser.name);
  });

  test("PATCH /users/:userId - update user info", async () => {
    const response = await request(app)
      .patch(`/users/${userId}`)
      .send({ name: "charlisseUpdated" });

    expect(response.status).toBe(200);
    expect(response.body.updatedUser.name).toBe("charlisseUpdated");
  });

  test("DELETE /users/:userId - delete user", async () => {
    const response = await request(app)
      .delete(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted successfully!");
  }); 
});