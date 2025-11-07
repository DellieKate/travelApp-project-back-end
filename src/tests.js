import { dbConnect, dbClose } from "./database/connectionManager.js";
import { CityModel } from "./database/entities/City.js";

// Quick database checks if populating occurred
(async () => {
    await dbConnect();

    const cities = await CityModel.find().populate("country activities packingEssentials");
    console.log(JSON.stringify(cities, null, 2));

    await dbClose();
})();