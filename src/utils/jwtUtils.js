import jwt from "jsonwebtoken";

function generateJwt(targetUser) {
  console.log("Target user", targetUser)
  if (!process.env.JWT_SECRET) {
    throw new Error("Please provide a JWT secret key in the server .env file.");  
  }

  const tokenPayLoad = {
    id: targetUser._id
  };

  const newJWT = jwt.sign(
    tokenPayLoad,
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return newJWT;
}

export { generateJwt };
