import { NextFunction } from "express";
//import { AppError } from "src/model/constants/AppError";


export async function authenticateRequest( req: Request, _res: Response, next: NextFunction ){
    try {
        //Authorization: Bearer a2f23...
        const token = req.headers.authorization;
        
        if (!token) {
            throw new Error("");
        }

        next();
        
    } catch (error) {
        return next(
            new Error("Unauthorized request")
        );
    }
};

exports.authenticateRequest = authenticateRequest;
