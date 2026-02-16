import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { CityModel } from "../database/entities/City.js";
import { CountryModel } from "../database/entities/Country.js";
import { dbConnect, dbClose } from "../database/connectionManager.js";
import { beforeEach, jest } from "@jest/globals";

jest.setTimeout(20000);

const MONGO_URL = "mongodb://127.0.0.1:27017/travelApp_test";

beforeAll(async () => {
    await mongoose.connect(MONGO_URL);
  });

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await dbClose();
});


// In order to create a city for the test database, a country needs to be created
// first, because the CityModel states that Country is a required field by ObjectID
describe("City Operations", () => {
  let country;
  let city;

  beforeEach(async () => {

    await CityModel.deleteMany({});
    await CountryModel.deleteMany({});

      country = await CountryModel.create({
        name: "Austria",
        visaReq: "No",
        currency: "Euro",
        language: "German"
      });
      
      city = await CityModel.create({
        name: "Vienna",
        bestMonths: "June to August",
        bestWeather: "Sunny",
        country: country._id
      });
  });

    // CREATE
  it("POST /cities should create a new city", async () => {
    const res = await request(app)
      .post("/cities")
      .send({
        name: "Salzburg",
        bestMonths: "May to September",
        bestWeather: "Clear",
        country: country._id
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.city.name).toBe("Salzburg");
  });

  // GET ALL
  it("GET /cities should return all cities", async () => {
    const res = await request(app).get("/cities");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.cities)).toBe(true);
    expect(res.body.cities.length).toBeGreaterThan(0);
  });

  // GET ONE
  it("GET /cities/:id should return one city", async () => {
    const res = await request(app).get(`/cities/${city._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.city._id).toBe(city._id.toString());
  });

  // UPDATE
  it("PATCH /cities/:id should update one city", async () => {
    const res = await request(app)
      .patch(`/cities/${city._id}`)
      .send({ name: "Graz" });

    expect(res.statusCode).toBe(200);
    expect(res.body.city.name).toBe("Graz");
  });

  // DELETE
  it("DELETE /cities/:id should delete one city", async () => {
    const res = await request(app).delete(`/cities/${city._id}`);

    expect(res.statusCode).toBe(200);

    const deleted = await CityModel.findById(city._id);
    expect(deleted).toBeNull();
  });
});