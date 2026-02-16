import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { VaxModel } from "../database/entities/VaxReq.js";
import { dbClose } from "../database/connectionManager.js";

jest.setTimeout(20000);

const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB";

beforeAll(async () => {
  await mongoose.connect(MONGO_URL);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await dbClose();
});

describe("Vax API Endpoints", () => {
  let vax;

  beforeEach(async () => {
    await VaxModel.deleteMany({});

    vax = await VaxModel.create({
      country: "Austria",
      vaxReq: ["Yellow Fever", "COVID-19"]
    });
  });

  // CREATE
  test("POST /vax - create new vax requirement", async () => {
    const response = await request(app).post("/vax").send({
      country: "Germany",
      vaxReq: ["COVID-19"]
    });

    expect(response.status).toBe(201);
    expect(response.body.vaxReq).toContain("COVID-19");
  });

  // GET ALL
  test("GET /vax - get all vax requirements", async () => {
    const response = await request(app).get("/vax");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // GET ONE
  test("GET /vax/:id - get single vax requirement", async () => {
    const response = await request(app).get(`/vax/${vax._id}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(vax._id.toString());
  });

  // UPDATE
  test("PATCH /vax/:id - update vax requirement", async () => {
    const response = await request(app)
      .patch(`/vax/${vax._id}`)
      .send({
        vaxReq: ["Yellow Fever", "COVID-19", "Hepatitis A"]
      });

    expect(response.status).toBe(200);
    expect(response.body.vaxReq).toContain("Hepatitis A");
  });

  // DELETE
  test("DELETE /vax/:id - delete vax requirement", async () => {
    const response = await request(app).delete(`/vax/${vax._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Vax requirement deleted successfully"
    );
  });
});
