import jwt from 'jsonwebtoken';
import { Jwt_Secret } from '../config/config.js';

export const authentication = async (req,res, next) => {

    try{

        const token = req.cookies.token;
        console.log(token);
        
        if(!token) {
            return res.status(400).send("No Token provided, please make a Login...");
        }

        const decoded = jwt.verify(token, Jwt_Secret);

        req.user = decoded;

        next();

    }catch(e) {
        console.log("JWT Verification error", e)
    }


}

