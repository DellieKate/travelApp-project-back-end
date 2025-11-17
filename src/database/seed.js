import { dbConnect, dbClose } from "./connectionManager.js"
import { ActivitiesModel } from "./entities/Activities.js"
import { CityModel } from "./entities/City.js"
import { CountryModel } from "./entities/Country.js"
import { PackingEssentialsModel } from "./entities/PackingEssentials.js"
import { UserModel } from "./entities/User.js"
import { VaxReqModel } from "./entities/VaxReq.js"
import { WishListModel } from "./entities/WishList.js"

const vaxReqs = [
  { vaxReq: "DTP, Polio, MMR, Hep B & A, Varicella, Meningococcal, Influenza, Pneumococcal, COVID 19"}
];

const countries = [
  { name: "Poland", visaReq: "Yes", currency: "Zloty", language: "Polish" }, 
  { name: "Canada", visaReq: "Yes", currency: "Canadian Dollar", language: "English" }, 
  { name: "Brazil", visaReq: "Yes", currency: "Brazilian Real", language: "Portuguese" }, 
  { name: "China", visaReq: "Yes", currency: "Yuan", language: "Mandarin" }
];

const activities = [
  { name: "museum", description: "Explore cultural sites and art galleries."},
  { name: "restaurants", description: "Dine at local and international sopts."},
  { name: "hiking", description: "Adventure through natural landscapes."},
  { name: "beach", description: "Relax and enjoy coastal vibes."}
];

const packingEssentials = [
  { season: "winter", items: ["warm coat, fleece, rain jacket, warm accessories"]},
  { season: "summer", items: ["breathable clothing, thongs, sunscreen"]},
  { season: "general", items: ["comfortable shoes, sunscreen, hat, bottled water, travel adaptor"]},
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
    name: "miajames",
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
  

// Drop all collections
  const models = [
    ActivitiesModel,
    CityModel,
    CountryModel,
    PackingEssentialsModel,
    UserModel,
    VaxReqModel,
    WishListModel
  ];

await Promise.all (
  models.map(async (model) => {
    try {
      await model.collection.drop();
      console.log(`Dropped models: ${model.collection.collectionName}`);
    } catch (error) {
      if (error.code !== 26) throw error;}
  })
); 
  
// Insert Data
  const insertedVaxReqs = await VaxReqModel.insertMany(vaxReqs);

  const insertedCountries = await CountryModel.insertMany(
    countries.map(c => ({...c, vaxReq: insertedVaxReqs[0]._id }))
  );

  const insertedActivities = await ActivitiesModel.insertMany(activities);
  const insertedEssentials = await PackingEssentialsModel.insertMany(packingEssentials);

  const insertedCities = await CityModel.insertMany(
    cityData.map(c => ({
    name: c.name,
    bestMonths: c.bestMonths,
    bestWeather: c.bestWeather,
    country: insertedCountries.find(co => co.name === c.countryName)?._id,
    activities: (c.activityNames || []).map(a => insertedActivities.find(act => act.name === a)?._id),
    packingEssentials: (c.packingKeyWords || []).map(s => insertedEssentials.find(e => e.season === s)?._id)
    })) 
  );
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






