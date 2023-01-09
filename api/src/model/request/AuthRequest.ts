import { Request } from "express";

export type UserData = {
    id: string,
    isAdmin: boolean
}

export interface AuthRequest extends Request {
    userData: UserData
}