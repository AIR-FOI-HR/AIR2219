import * as jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Response, Request } from "express";
import { AuthRequest } from "../model/request/AuthRequest";

export async function authenticateRequest( req: Request, _: Response, next: NextFunction ){
    try {
        //Authorization: Bearer a2f23...
        const authHeader = req.headers['authorization'];
        
        if (!authHeader) {
            throw new Error("Authentication failed.");
        }

        const jwt = authHeader.split(" ")[1]
        const jwtKey = process.env.JWT_KEY ? process.env.JWT_KEY : 'epCWPfx1T3s9FbVx';

        const payload = jsonwebtoken.verify(jwt, jwtKey) as jsonwebtoken.JwtPayload;
        (req as AuthRequest).userData = { id: payload.id, isAdmin: payload.isAdmin };

        next();
        
    } catch (error) {
        return next(
            new Error("Unauthorized request")
        );
    }
};

exports.authenticateRequest = authenticateRequest;
