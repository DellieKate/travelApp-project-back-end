import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { CityModel } from "../database/entities/City.js";
import { CountryModel } from "../database/entities/Country.js";
import { dbConnect, dbClose } from "../database/connectionManager.js";
import { jest } from "@jest/globals";

jest.setTimeout(20000);

beforeAll(async () => {
    const MONGO_URL = "mongodb://127.0.0.1:27017/TravelAppTestDB-City";
    await mongoose.connect(MONGO_URL);
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

// In order to create a city for the test database, a country needs to be created
// first, because the CityModel states that Country is a required field by ObjectID
describe("City Operations", () => {
  let fakeCityId1;
  let fakeCityId2;
  let fakeCityId3;
  let fakeCountryId;

  beforeAll(async () => {
      const country = await CountryModel.create({
        name: "France",
        visaReq: "No",
        currency: "Euro",
        language: "German"
      });
      fakeCountryId = country._id;
      const city1 = await CityModel.create({
        name: "Lublin1", 
        bestMonths: "May to September",
        bestWeather: "Spring to Autumn",
        countryName: "Poland",
        country: country
      })
      fakeCityId1 = city1._id
      const city2 = await CityModel.create({
        name: "Lublin2", 
        bestMonths: "May to September",
        bestWeather: "Spring to Autumn",
        countryName: "Poland",
        country: country
      })
      fakeCityId2 = city2._id
      const city3 = await CityModel.create({
        name: "Lublin3", 
        bestMonths: "May to September",
        bestWeather: "Spring to Autumn",
        countryName: "Poland",
        country: country
      })
      fakeCityId3 = city3._id
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
      const res = await request(app).get(`/cities/${fakeCityId1}`);
      expect (res.statusCode).toBe(200);
      expect(res.body.city._id).toBe(fakeCityId1.toString());
  });

  // UPDATE ONE city
  it("PATCH /cities/:id should update one city", async () => {
    const res = await request(app)
      .patch(`/cities/${fakeCityId2}`)
      .send({ name: "Salzburg" });

    expect(res.statusCode).toBe(200);
    expect(res.body.city.name).toBe("Salzburg");
  });

  // DELETE ONE city
  it("DELETE /cities/:id should delete one city", async () => {
    const res = await request(app).delete(`/cities/${fakeCityId3}`);
    expect(res.statusCode).toBe(200);

    const deleted = await CityModel.findById(fakeCityId3);
    expect(deleted).toBeNull();
  });
});
