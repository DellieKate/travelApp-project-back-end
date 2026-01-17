jest.setTimeout(20000);

import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { CityModel } from "../database/entities/City.js";
import { CountryModel } from "../database/entities/Country.js";
import { dbConnect, dbClose } from "../database/connectionManager.js";

let thisFileDatabaseName = process.env.TEST_DATABASE_URL;

beforeAll(async () => {
  try {
    await dbClose();
    await dbConnect(thisFileDatabaseName);
  } catch (error) {
    console.log(error);
  }
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


// In order to create a city for the test database, a country needs to be created
// first, because the CityModel states that Country is a required field by ObjectID
describe("City Operations", () => {
  let fakeCityId;
  let fakeCountryId;

  beforeAll(async () => {
      const country = await CountryModel.create({
        name: "Austria",
        visaReq: "No",
        currency: "Euro",
        language: "German"
      });
      fakeCountryId = country._id;
  });

  // CREATE ONE city
  it("POST /cities should create a new city", async () => {
      const res = await request(app)
        .post("/cities")
        .send({
            name: "Vienna",
            bestMonths: "June to August",
            bestWeather: "Sunny",
            country: fakeCountryId
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.city.name).toBe("Vienna");
      fakeCityId = res.body.city._id;
  });

  // GET ALL cities
  it("GET /cities should return all cities", async () => {
      const res = await request(app).get("/cities");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.cities)).toBe(true);
      expect(res.body.cities.length).toBeGreaterThan(0);
  });

  // GET ONE city
  it("GET /cities/:id should return one city", async () => {
      const res = await request(app).get(`/cities/${fakeCityId}`);
      expect (res.statusCode).toBe(200);
      expect(res.body.city._id).toBe(fakeCityId);
  });

  // UPDATE ONE city
  it("PATCH /cities/:id should update one city", async () => {
    const res = await request(app)
      .patch(`/cities/${fakeCityId}`)
      .send({ name: "Salzburg" });

    expect(res.statusCode).toBe(200);
    expect(res.body.city.name).toBe("Salzburg");
  });

  // DELETE ONE city
  it("DELETE /cities/:id should delete one city", async () => {
    const res = await request(app).delete(`/cities/${fakeCityId}`);
    expect(res.statusCode).toBe(200);

    const deleted = await CityModel.findById(fakeCityId);
    expect(deleted).toBeNull();
  });
});
