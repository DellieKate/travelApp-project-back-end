import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authToken( request, response, next) {
    let token = request.headers.authorization;

    if (token) {
        token = token.split(" ")[1];
    }
    
    if (!token) {
        console.error("Authorization failed: No token provided");
        return response.status(401).json({ error: "Access denied. No token provided."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.user = decoded;
        next();
    } catch (error) {
        console.error ("Authentication failed: Invalid token.", error.message);
        return response.status(403).json({error: "Invalid or expired token."});
    };
};

export { 
    authToken
};