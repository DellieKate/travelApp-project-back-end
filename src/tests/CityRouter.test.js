import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { CityModel } from "../database/entities/City.js";
import { dbConnect, dbClose } from "../database/connectionManager.js";
import { jest } from "@jest/globals";

jest.setTimeout(20000);

beforeAll(async () => {
    await dbConnect()
    await mongoose.connection.dropDatabase();
  });

afterAll(async () => {
  await mongoose.disconnect()
});

describe("City Operations", () => {

  // CREATE ONE city
  it("POST /cities should create a new city", async () => {
      const res = await request(app)
        .post("/cities")
        .send({
            name: "Novalaise",
            bestMonths: "June to August",
            bestWeather: "Sunny"
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.city.name).toBe("Novalaise");
  });

  // GET ALL cities
  it("GET /cities should return all cities", async () => {
      await CityModel.create({
        name: "Abu Tij", 
        bestMonths: "May to September",
        bestWeather: "Spring to Autumn"
      })

      const res = await request(app).get("/cities");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.cities)).toBe(true);
      expect(res.body.cities.length).toBeGreaterThan(0);
  });

  // GET ONE city
  it("GET /cities/:id should return one city", async () => {
      const city = await CityModel.create({
        name: "Lubrza", 
        bestMonths: "May to September",
        bestWeather: "Spring to Autumn"
      })

      const res = await request(app).get(`/cities/${city._id.toString()}`);
      expect (res.statusCode).toBe(200);
      expect(res.body.city._id).toBe(city._id.toString());
  });

  // UPDATE ONE city
  it("PATCH /cities/:id should update one city", async () => {
    const city = await CityModel.create({
        name: "Mount Airy", 
        bestMonths: "May to September",
        bestWeather: "Spring to Autumn"
    })

    const res = await request(app)
      .patch(`/cities/${city._id.toString()}`)
      .send({ name: "Salzburg" });

    expect(res.statusCode).toBe(200);
    expect(res.body.city.name).toBe("Salzburg");
  });

  // DELETE ONE city
  it("DELETE /cities/:id should delete one city", async () => {
    const city = await CityModel.create({
        name: "Challans", 
        bestMonths: "May to September",
        bestWeather: "Spring to Autumn"
    })

    const res = await request(app).delete(`/cities/${city._id.toString()}`);
    expect(res.statusCode).toBe(200);

    const deleted = await CityModel.findById(city._id);
    expect(deleted).toBeNull();
  });
});
