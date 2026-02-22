import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { PackingEssentialsModel } from "../database/entities/PackingEssentials.js";
import { dbConnect, dbClose} from "../database/connectionManager.js";
import { jest } from "@jest/globals";

jest.setTimeout(2000);

beforeAll(async () => {
    await dbConnect()
    await mongoose.connection.dropDatabase();
  });

afterAll(async () => {
  await mongoose.disconnect()
});

describe("PackingEssentials Operations", () => {
  let fakePackingId;

  // CREATE ONE PackingEssentials List
  it("POST /packing should create a new PackingEssentials entry", async () => {
    const res = await request(app)
      .post("/packing")
      .send({
        items: ["Water bottle", "Hiking Shoes", "Small Backpack"]
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.packessent.items).toContain("Water bottle");
    fakePackingId = res.body.packessent._id;
  });

  // GET ALL PackingEssentials Lists
  it("GET /packing should return all PackingEssentials Lists", async () => {
    const res = await request(app).get("/packing");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.packessent)).toBe(true);
    expect(res.body.packessent.length).toBeGreaterThan(0);
  });

  // GET ONE PackingEssentials List
  it("GET /packing/:id should return one PackingEssentials List", async () => {
    const res = await request(app).get(`/packing/${fakePackingId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.packessent._id).toBe(fakePackingId);
  });

  // UPDATE ONE PackingEssentials List
  it("PATCH /packing/:id should update one PackingEssentials List", async () => {
    const res = await request(app)
      .patch(`/packing/${fakePackingId}`)
      .send({ items: [ "New item" ]});
    expect(res.statusCode).toBe(200);
    expect(res.body.packessent.items).toContain("New item");
  });

  // DELETE ONE PackingEssentials List
  it("DELETE /packing/:id should delete one PackingEssentials List", async () => {
    const packingEssential = await PackingEssentialsModel.create({
      season: "Summer",
      items: ["Water bottle"]
    })

    const res = await request(app).delete(`/packing/${packingEssential._id.toString()}`);
    expect(res.statusCode).toBe(200);

    const deleted = await PackingEssentialsModel.findById(packingEssential._id);
    expect(deleted).toBeNull();
  });
});