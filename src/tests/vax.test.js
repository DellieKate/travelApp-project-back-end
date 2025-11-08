import { jest } from "@jest/globals";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";

jest.setTimeout(20000);

describe("Vax API Endpoints", () => {
  let vaxId;

  beforeAll(async () => {
    const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB";
    await mongoose.connect(MONGO_URL);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  test("POST /vax - create new vax requirement", async () => {
    const response = await request(app).post("/vax").send({
      vaxReq: ["Yellow Fever", "COVID-19"]
    });
    expect(response.status).toBe(201);
    vaxId = response.body._id;
  });

  test("GET /vax - get all vax requirements", async () => {
    const response = await request(app).get("/vax");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /vax/:id - get single vax requirement", async () => {
    const response = await request(app).get(`/vax/${vaxId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", vaxId);
  });

  test("PUT /vax/:id - update vax requirement", async () => {
    const response = await request(app).put(`/vax/${vaxId}`).send({
      vaxReq: ["Yellow Fever", "COVID-19", "Hepatitis A"]
    });
    expect(response.status).toBe(200);
    expect(response.body.vaxReq).toContain("Hepatitis A");
  });

  test("DELETE /vax/:id - delete vax requirement", async () => {
    const response = await request(app).delete(`/vax/${vaxId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Vax requirement deleted successfully");
  });
});
