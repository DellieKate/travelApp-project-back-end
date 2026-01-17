import mongoose from "mongoose";
import request from "supertest";
import { app } from "../server.js";
import { WishListModel } from "../database/entities/WishList.js";
import { dbConnect, dbClose } from "../database/connectionManager.js";
import { jest } from "@jest/globals";
jest.setTimeout(20000);

let thisFileDatabaseName = process.env.MONGO_URL_TEST;

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

describe("WishList Operations", () => {
  let fakeWishListId;

  // CREATE ONE WishList
  it("POST /wishlist should create a new WishList", async () => {
    try {
      const res = await request(app)
        .post("/wishlist")
        .send({ listName: ["Athens", "Tokyo"] });
      expect(res.statusCode).toBe(201);
      expect(res.body.wishlist.listName).toContain("Athens");
      fakeWishListId = res.body.wishlist._id;
    } catch (error) {
        console.log(error);
    }
  });

  // GET ALL WishLists
  it("GET /wishlist should return all WishLists", async () => {
    try {
      const res = await request(app).get("/wishlist");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.wishlist)).toBe(true);
      expect(res.body.wishlist.length).toBeGreaterThan(0);
    } catch (error) {
        console.log(error);
    }
  });

  // GET ONE WishList
  it("GET /wishlist/:id should return one WishList", async () => {
    try {
      const res = await request(app).get(`/wishlist/${fakeWishListId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.wishlist._id).toBe(fakeWishListId);
    } catch (error) {
        console.log(error);
    }
  });

  // UPDATE ONE WishList
  it("PATCH /wishlist/:id should update one WishList", async () => {
    try {
      const res = await request(app)
        .patch(`/wishlist/${fakeWishListId}`)
        .send({ listName: ["Santiago"] });
      expect(res.statusCode).toBe(200);
      expect(res.body.wishlist.listName).toContain("Santiago");
    } catch (error) {
        console.log(error);
    }
  });

  // DELETE ONE WishList
  it("DELETE /wishlist/:id should delete one WishList", async () => {
    try {
      const res = await request(app).delete(`/wishlist/${fakeWishListId}`);
      expect(res.statusCode).toBe(200);

      const deleted = await WishListModel.findById(fakeWishListId);
      expect(deleted).toBeNull();
    } catch (error) {
        console.log(error);
    }
  });
});

