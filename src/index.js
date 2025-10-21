
const PORT = process.env.PORT || 3000;

import {app} from "./server.js";

app.listen(PORT, () => {
    console.log("The server is running in port: " + PORT);
});