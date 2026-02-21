import { jest } from "@jest/globals";
jest.setTimeout(20000);

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { CountryModel } from "../database/entities/Country.js";
import { dbConnect, dbClose } from "../database/connectionManager.js";

describe("Country API Endpoints", () => {
  let countryId;

  beforeAll(async () => {
    // const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB-Country";
    // await mongoose.connect(MONGO_URL);
    // await mongoose.connection.dropDatabase();
    await dbConnect()
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
  // try {
  //   if (mongoose.connection.readyState === 1) {
  //     await mongoose.connection.dropDatabase();
  //   }
  // } finally {
  //   await dbClose();
  // }
  await dbClose();
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
  });

  test("GET /countries - get all countries", async () => {
    const response = await request(app).get("/countries");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /countries/:id - get single country", async () => {
    const country = await CountryModel.create({
      name: "Austria",
      visaReq: "No",
      currency: "Euro",
      language: "German"
    });
    const response = await request(app).get(`/countries/${country._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", country._id.toString());
  });

  test("PATCH /countries/:id - update country", async () => {
    const country = await CountryModel.create({
      name: "Belgium",
      visaReq: "No",
      currency: "Euro",
      language: "German"
    });
    const response = await request(app).patch(`/countries/${country._id}`).send({ currency: "TSTD" });
    expect(response.status).toBe(200);
    expect(response.body.currency).toBe("TSTD");
  });

  test("DELETE /countries/:id - delete country", async () => {
    const country = await CountryModel.create({
      name: "Denmark",
      visaReq: "No",
      currency: "Euro",
      language: "German"
    });
    const response = await request(app).delete(`/countries/${country._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Country deleted successfully");
  });
});
