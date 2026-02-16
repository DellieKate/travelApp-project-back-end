import { jest } from "@jest/globals";
jest.setTimeout(20000);

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { dbConnect, dbClose } from "../database/connectionManager.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB";

beforeAll(async () => {
  await mongoose.connect(MONGO_URL);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await dbClose();
});

describe("Country API Endpoints", () => {
  let countryId;

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

  test("PATCH /countries/:id - update country", async () => {
    const response = await request(app).patch(`/countries/${countryId}`).send({ currency: "TSTD" });
    expect(response.status).toBe(200);
    expect(response.body.currency).toBe("TSTD");
  });

  test("DELETE /countries/:id - delete country", async () => {
    const response = await request(app).delete(`/countries/${countryId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Country deleted successfully");
  });
});
