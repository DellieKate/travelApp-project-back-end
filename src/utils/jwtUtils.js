import jwt from "jsonwebtoken";

function generateJwt(targetUser) {
  console.log("Target user", targetUser)
  const jwtSecret = process.env.JWT_SECRET || "defaultsecret";
  if (!jwtSecret) {
    throw new Error("Please provide a JWT secret key in the server .env file.");  
  }

  const tokenPayLoad = {
    id: targetUser._id
  };

  const newJWT = jwt.sign(
    tokenPayLoad,
    jwtSecret,
    { expiresIn: "24h" }
  );

  return newJWT;
}

export { generateJwt };
