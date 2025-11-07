
const PORT = process.env.PORT || 3000;

import { dbConnect } from "./database/connectionManager.js";
import { app } from "./server.js";

// 1. Connect to the database
dbConnect().then(() => {

    // 2. Activate the Express server
    app.listen(PORT, () => {
        console.log("The server is running in port: " + PORT);
    });

});



