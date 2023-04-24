import { RequestHandler, Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { Payload } from "../types";


export const authenticate: RequestHandler<unknown,unknown,unknown,unknown> = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return next(createHttpError(401, "User not authenticated"))

        const user = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET as string)
        req.user = user
        next()
    } catch(e){
        next(e)
    }
    
}

export function verifyToken(token: string, secret: string): Promise<Payload> {
    return new Promise((resolve, reject) => {
       
        jwt.verify(token, secret as string, (err, user) => {
            if (err) {
                reject(createHttpError(401, "User not authenticated"))
            }
            else {
                resolve(user as Payload)
            }
        })
    })
}


export function generateAccessToken(payload: Payload){
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' })
}

export function generateRefreshToken(payload: Payload){
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string)
}