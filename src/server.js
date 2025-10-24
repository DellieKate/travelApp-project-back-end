import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());

//CORS to help limit what the front-end users can access our API
import cors from "cors";
let corsOption = {
    origin: [
        "http://localhost:5000",
        "https://deployedReact.App.com"
    ],
    optionsSuccessStatus: 200
}
app.use(cors(corsOption));


//Receive JSON body data on requests
app.use(express.json());


//Homepage
app.get("/", (request, response) => {
    response.json({
        message: "Hello! Welcome to your Travel App!"
    });
});

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