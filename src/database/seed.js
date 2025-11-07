import mongoose, { model } from "mongoose"
import { dbConnect, dbClose } from "./connectionManager.js"
import { ActivitiesModel } from "./entities/Activities.js"
import { CityModel } from "./entities/City.js"
import { CityWishListModel } from "./entities/CityWishList.js"
import { CountryModel } from "./entities/Country.js"
import { PackingEssentialsModel } from "./entities/PackingEssentials.js"
import { UserModel } from "./entities/User.js"
import { VaxReqModel } from "./entities/VaxReq.js"
import { WishListModel } from "./entities/WishList.js"


const city = [{
      name: "Lublin", 
      bestMonths: "May to September",
      bestWeather: "Spring to Autumn",
    },
    { 
      name: "Vancouver", 
      bestMonths: "June to September",
      bestWeather: "Summer",
    },
    { 
      name: "Rio de Janeiro", 
      bestMonths: "April to May, September to November",
      bestWeather: "Shoulder season (mild and warm)",
    },
    { 
      name: "Shanghai", 
      bestMonths: "April to May, October to November",
      bestWeather: "Spring to Autumn",
    }
]

const country = [{
      name: "Poland",
      visa_req: "Yes",
      currency: "Zloty",
      language: "Polish",
    }, 
    {
      name: "Canada",
      visa_req: "Yes",
      currency: "Canadian Dollar",
      language: "English",
    }, 
    {
      name: "Brazil",
      visa_req: "Yes",
      currency: "Brazilian Real",
      language: "Portuguese",
    }, 
    {
      name: "China",
      visa_req: "Yes",
      currency: "Yuan",
      language: "Mandarin"
    }
]


const vaxReq = [{
      vaxReq: "DTP, Polio, MMR, Hep B & A, Varicella, Meningococcal, Influenza, Pneumococcal, COVID 19"
}]

const packingEssentials = [
    { items: "winter: warm coat, fleece, rain jacket, warm accessories"},
    { items: "summer: breathable clothing, thongs, sunscreen"},
    { items: "general: comfortable shoes, sunscreen, hat, travel adaptor"},
]

const activities = [
    { name: "museum", description: "explore"},
    { name: "restaurants", description: "dine"},
    { name: "hiking", description: "adventure"},
    { name: "beach", description: "relax"}
]

// Seed data
async function seedDatabase() {
  try {
    await dbConnect();
  
  const collections = [
    ActivitiesModel,
    CityModel,
    CityWishListModel,
    CountryModel,
    PackingEssentialsModel,
    UserModel,
    VaxReqModel,
    WishListModel
  ];

await Promise.all (
  collections.map(async (model) => {
    try {
      await model.collection.drop();
      console.log("Dropped collection: ${model.collection,collectionName}");
    } catch (error) {
      if (error.code === 26) {
        console.log("Collection ${model.collection.collectionName} does not exist, skipping drop.");
      } else {
        throw error;
      }
    }
  })
); 

    //Insert new data
    await ActivitiesModel.insertMany(activities);
    await CityModel.insertMany(city);
    await CountryModel.insertMany(country);
    await PackingEssentialsModel.insertMany(packingEssentials);
    //await UserModel.insertMany(user);
    await VaxReqModel.insertMany(vaxReq);

    console.log("Database seeded successfully.")
  } catch (error) {
    console.error ("Error seeding database:", error);
  } finally {
    await dbClose();
  }
}
 
seedDatabase ();






