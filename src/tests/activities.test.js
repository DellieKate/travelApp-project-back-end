import { jest } from "@jest/globals";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";

jest.setTimeout(20000);

describe("Activity API Endpoints", () => {
  let activityId;

  beforeAll(async () => {
    const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB";
    await mongoose.connect(MONGO_URL);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  test("POST /activities - create new activity", async () => {
    const response = await request(app).post("/activities").send({
      name: "Hiking",
      type: "Outdoor",
      location: "Mountain"
    });
    expect(response.status).toBe(201);
    activityId = response.body._id;
  });

  test("GET /activities - get all activities", async () => {
    const response = await request(app).get("/activities");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /activities/:id - get single activity", async () => {
    const response = await request(app).get(`/activities/${activityId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", activityId);
  });

  test("PUT /activities/:id - update activity", async () => {
    const response = await request(app).put(`/activities/${activityId}`).send({ location: "Beach" });
    expect(response.status).toBe(200);
    expect(response.body.location).toBe("Beach");
  });

  test("DELETE /activities/:id - delete activity", async () => {
    const response = await request(app).delete(`/activities/${activityId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Activity deleted successfully");
  });
});
