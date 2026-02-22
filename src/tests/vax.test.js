import { jest } from "@jest/globals";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { dbConnect, dbClose } from "../database/connectionManager.js";
import { VaxReqModel } from "../database/entities/VaxReq.js";

jest.setTimeout(2000);

process.env.JWT_SECRET = ""

describe("Vax API Endpoints", () => {
  let vaxId;

  beforeAll(async () => {
      await dbConnect()
      await mongoose.connection.dropDatabase();
    });
  
  afterAll(async () => {
    await mongoose.disconnect()
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

  test("PATCH /vax/:id - update vax requirement", async () => {
    const vaxTest = await VaxReqModel.create({
      vaxReq: ["Yellow Fever", "COVID-19"]
    })

    const response = await request(app).patch(`/vax/${vaxTest._id.toString()}`).send({
      vaxReq: ["Yellow Fever", "COVID-19", "Hepatitis A"]
    });
    expect(response.status).toBe(200);
    expect(response.body.vaxReq).toContain("Hepatitis A");
  });

  test("DELETE /vax/:id - delete vax requirement", async () => {
    const vaxTest = await VaxReqModel.create({
      vaxReq: ["Yellow Fever", "COVID-19", "Hepatitis A"]
    })

    const response = await request(app).delete(`/vax/${vaxTest._id.toString()}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Vax requirement deleted successfully");
  });
});
