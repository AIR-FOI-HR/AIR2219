const jwt = require("jsonwebtoken")
import { NextFunction } from "express";


export async function authenticateRequest( req: Request, _res: Response, next: NextFunction ){
    try {

        //Authorization: Bearer a2f23...
        const token = req.headers.authorization.split(" ")[1];
        
        if (!token) {
            throw new Error("Authentication failed.");
        }

        const payload = jwt.verify(token, process.env.JWT_KEY);
        req.userData = { id: payload.username, isAdmin: payload.isAdmin };

        next();
        
    } catch (error) {
        return next(
            new Error("Unauthorized request")
        );
    }
};

exports.authenticateRequest = authenticateRequest;
