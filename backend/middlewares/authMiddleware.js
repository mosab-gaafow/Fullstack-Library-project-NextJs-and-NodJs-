// import jwt from 'jsonwebtoken';
// import { Jwt_Secret } from '../config/config.js';

// export const authentication = async (req,res, next) => {

//     try{

//         const token = req.cookies.token;
//         console.log(token);
        
//         if(!token) {
//             return res.status(400).send("No Token provided, please make a Login...");
//         }

//         const decoded = jwt.verify(token, Jwt_Secret);

//         req.user = decoded;

//         next();

//     }catch(e) {
//         console.log("JWT Verification error", e)
//     }


// }



import jwt from "jsonwebtoken";
import { Jwt_Secret } from "../config/config.js";

export const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(403).send("No token provided, please log in.");
  }

  try {
    const decoded = jwt.verify(token, Jwt_Secret);
    req.user = decoded; // Attach the decoded user information to the request
    next();
  } catch (err) {
    return res.status(401).send("Invalid token.");
  }
};
