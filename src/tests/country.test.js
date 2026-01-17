import { jest } from "@jest/globals";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";

jest.setTimeout(20000);

describe("Country API Endpoints", () => {
  let countryId;

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


  test("POST /countries - create a new country", async () => {
    const response = await request(app).post("/countries").send({
      name: "TestLand",
      visaReq: "Visa on arrival",
      currency: "TST",
      language: "Testish",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    countryId = response.body._id;
  });

  test("GET /countries - get all countries", async () => {
    const response = await request(app).get("/countries");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /countries/:id - get single country", async () => {
    const response = await request(app).get(`/countries/${countryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", countryId);
  });

  test("PUT /countries/:id - update country", async () => {
    const response = await request(app).put(`/countries/${countryId}`).send({ currency: "TSTD" });
    expect(response.status).toBe(200);
    expect(response.body.currency).toBe("TSTD");
  });

  test("DELETE /countries/:id - delete country", async () => {
    const response = await request(app).delete(`/countries/${countryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Country deleted successfully");
  });
});
