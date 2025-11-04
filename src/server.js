import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import router from "./controllers/users/UserRoutes.js";
import countryRouter from "./controllers/country/CountryRoutes.js";
import vaxRouter from "./controllers/vax/VaxReqRoutes.js";
import activitiesRouter from "./controllers/activities/ActivityRoutes.js";

const app = express();

app.use(helmet());


//CORS (cross-origin resource sharing) - security feature that controls which external websites 
// are allowed to make requests to our server
import cors from "cors";

let corsOption = {                      // configuration for allowed frontends
    origin: [                           // list of trusted sites that can call API
        "http://localhost:5000",        // React app running locally for development
        "https://travelReact.App.com"   // React app running live for production
    ],
    optionsSuccessStatus: 200
}
app.use(cors(corsOption)); // activates CORS on the Express server 


//Receive JSON body data on requests
app.use(express.json());


//Homepage
app.get("/", (request, response) => {
    response.json({
        message: "Hello! Welcome to your Travel App!"
    });
});

app.get("/databaseHealth", (request, response) => {
    response.json({
        models: mongoose.connection.modelNames(),
        host: mongoose.connection.host
    });
});

const userRouter = router
app.use("/users", userRouter);
app.use("/countries", countryRouter);
app.use("/vax", vaxRouter);
app.use("/activities", activitiesRouter);


//404 route handler, if no route has been activated
app.all(/.*/, (request, response) => {
    response.status(404).json({
        message: "Route not found! Try again", 
        targetPath: request.path
    });
});

export {
    app
}