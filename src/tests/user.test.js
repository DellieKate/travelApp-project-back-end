import { jest } from "@jest/globals";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server.js";
import { UserModel } from "../database/entities/User.js";
import { dbConnect, dbClose } from "../database/connectionManager.js";
require('dotenv').config({ path: '.env' });

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
    // process.env.JWT_SECRET = "testsecret123";
    // const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB-User";
    // await mongoose.connect(MONGO_URL);
    // await mongoose.connection.dropDatabase();
    await dbConnect()
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    // await mongoose.connection.close();
    await dbClose()
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
    const user = await UserModel.create({
      name: "lars",
      email: "lars@example.com",
      password: "Password123",
      citizenship: "Australia"
    });

    const response = await request(app)
      .post("/users/login")
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
    expect(response.body.user._id).toBe(user._id.toString());
  });

  test("GET /users/:userId - retrieve single user", async () => {
    const response = await request(app)
      .get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("_id", userId);
    expect(response.body.user.name).toBe(testUser.name);
  });

  test("PATCH /users/:userId - update user info", async () => {
    const user = await UserModel.create({
      name: "bob",
      email: "bob@example.com",
      password: "Password123",
      citizenship: "Australia"
    });

    const response = await request(app)
      .patch(`/users/${user._id}`)
      .send({ name: "charlisseUpdated" });

    expect(response.status).toBe(200);
    expect(response.body.updatedUser.name).toBe("charlisseUpdated");
  });

  test("DELETE /users/:userId - delete user", async () => {
    const user = await UserModel.create({
      name: "ben",
      email: "ben@example.com",
      password: "Password123",
      citizenship: "Australia"
    });

    const response = await request(app)
      .delete(`/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted successfully!");
  }); 
});