import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.env.config();

function generateJwt(targetUser) {
    let tokenPayLoad = {
        id: targetUserInstance.id
    };

    if (!process.env.JWT_SECRET){
        throw new Error("Please provide a JWT secret key in the server .env file.");  
    };

    let newJWT = jwt.sign(
        tokenPayLoad,
        process.env.JWT_SECRET,
        {expiresIn: "24hr"}
    );

    return newJWT;
}

exports = {
    generateJwt
}