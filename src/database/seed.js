import mongoose from "mongoose";
import { dbConnect, dbClose } from "./connectionManager.js"
import { ActivitiesModel } from "./entities/Activities.js"
import { CityModel } from "./entities/City.js"
import { CityWishListModel } from "./entities/CityWishList.js"
import { CountryModel } from "./entities/Country.js"
import { PackingEssentialsModel } from "./entities/PackingEssentials.js"
import { UserModel } from "./entities/User.js"
import { VaxReqModel } from "./entities/VaxReq.js"
import { WishListModel } from "./entities/WishList.js"

const country = [
  { name: "Poland", visa_req: "Yes", currency: "Zloty", language: "Polish" }, 
  { name: "Canada", visa_req: "Yes", currency: "Canadian Dollar", language: "English" }, 
  { name: "Brazil", visa_req: "Yes", currency: "Brazilian Real", language: "Portuguese" }, 
  { name: "China", visa_req: "Yes", currency: "Yuan", language: "Mandarin" }
];

const vaxReq = [
  { vaxReq: "DTP, Polio, MMR, Hep B & A, Varicella, Meningococcal, Influenza, Pneumococcal, COVID 19"}
];

const activities = [
    { name: "museum", description: "Explore cultural sites and art galleries."},
    { name: "restaurants", description: "Dine at local and international sopts."},
    { name: "hiking", description: "Adventure through natural landscapes."},
    { name: "beach", description: "Relax and enjoy coastal vibes."}
];

const packingEssentials = [
    { items: "winter: warm coat, fleece, rain jacket, warm accessories"},
    { items: "summer: breathable clothing, thongs, sunscreen"},
    { items: "general: comfortable shoes, sunscreen, hat, bottled water, travel adaptor"},
];

const cityData = [
  {
      name: "Lublin", 
      bestMonths: "May to September",
      bestWeather: "Spring to Autumn",
      countryName: "Poland",
      activityNames: ["museum"],
      packingKeyWords: ["summer"],
    },
    { 
      name: "Vancouver", 
      bestMonths: "June to September",
      bestWeather: "Summer",
      countryName: "Canada",
      activityNames: ["hiking"],
      packingKeyWords: ["summer"]
    },
    { 
      name: "Rio de Janeiro", 
      bestMonths: "April to May, September to November",
      bestWeather: "Shoulder season (mild and warm)",
      countryName: "Brazil",
      activityNames: ["beach"],
      packingKeyWords: ["summer"]
    },
    { 
      name: "Shanghai", 
      bestMonths: "April to May, October to November",
      bestWeather: "Spring to Autumn",
      countryName: "China",
      activityNames: ["restaurants"],
      packingKeyWords: ["general"]
    }
]; 

const users = [
  {
    username: "Mia James",
    email: "miajames@email.com",
    citizenship: "citizenship",
    password: "Password123"
  }
];

// Seed data
async function seedDatabase() {
  try {
    await dbConnect();
    console.log ("Database connected.");
  
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
      console.log(`Dropped collection: ${model.collection.collectionName}`);
    } catch (error) {
      if (error.code === 26) {
        console.log(`Collection ${model.collection.collectionName} does not exist, skipping drop.`);
      } else throw error;
    }
  })
); 
  
  //Insert new data
  const insertedVaxReqs = await VaxReqModel.insertMany(vaxReq);
  const countriesWithVax = country.map(country => ({...country, vaxReq: insertedVaxReqs[0]._id }));
  const insertedCountries = await CountryModel.insertMany(countriesWithVax);

  const insertedActivities = await ActivitiesModel.insertMany(activities);
  const insertedEssentials = await PackingEssentialsModel.insertMany(packingEssentials);

  const city = cityData.map(city => ({
    name: city.name,
    bestMonths: city.bestMonths,
    country: insertedCountries.find(c => c.name === city.countryName)?._id,
    activities: (city.activityNames || []).map(name => insertedActivities.find(a => a.name === name)?._id),
    packingEssentials: (city.packingKeyWords || []).map(key => insertedEssentials.find(e => e.items.includes(key))?._id),


  })) 

  await CityModel.insertMany(city);
  console.log("Cities seeded successfully.");
  
  await UserModel.insertMany(users);
  console.log("Users seeded successfully.");


  console.log("Database seeded successfully.");
  } catch (error) {
    console.error ("Error seeding database:", error);
  } finally {
    await dbClose();
  }
}
 
seedDatabase ();






