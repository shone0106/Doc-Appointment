import { RequestHandler } from "express";
import 'dotenv/config'
import createHttpError from "http-errors";
import bcrypt from 'bcrypt'
import UserModel from "../models/User"
import Valid_Tokens from "../models/ValidToken"
import { Payload } from "../types";
import * as auth from '../middlewares/auth'


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        console.log(req.cookies)
        const userId = req.user.userId
        const user = await UserModel.findById(userId).exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const getNewAccessToken: RequestHandler = async (req, res, next) => {
    try{
        // console.log(req.cookies)
        if (!req.cookies?.jwt) {
            console.log("no cookie found")
            throw createHttpError(401, "User not authenticated")
        }
    
        const refreshToken: string = req.cookies.jwt
        const valid = await Valid_Tokens.findOne({token: refreshToken}).exec()
        if(!valid) throw createHttpError(401, "token expired")

        const user = await auth.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)
        const accessToken = auth.generateAccessToken({userId: user.userId})
        return res.status(201).json(accessToken)
    } catch(error){
        next(error)
    }
} 


interface Credentials {
    username?: string;
    password?: string;
}

export const signUp: RequestHandler<unknown, unknown, Credentials, unknown> = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing")
        }
        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if (existingUsername) throw createHttpError(409, 'Username already taken. Please choose a different one or log in instead.')

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await UserModel.create({ username: username, password: hashedPassword })

        res.status(201).json(newUser)

    } catch (error) {
        next(error)
    }
}


export const login: RequestHandler<unknown, unknown, Credentials, unknown> = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({ username: username }).exec()

        if (!user) throw createHttpError(401, "Invalid credentials")

        if (!await bcrypt.compare(password, user.password)) {
            throw createHttpError(401, "Invalid credentials")
        }

        const payload: Payload = {userId: user._id}

        const accessToken = auth.generateAccessToken(payload)
        const refreshToken = auth.generateRefreshToken(payload)

        res.cookie('jwt', refreshToken, { 
            httpOnly: true, 
            // path: '/api/user/token',
            // secure: true 
            });

        await Valid_Tokens.create({token: refreshToken})
       
        return res.status(201).json(accessToken)
    }
    catch (error) {
        next(error)
    }
}

export const logout: RequestHandler = async (req, res, next) => {
    try{
        const token = req.cookies.jwt
        await Valid_Tokens.deleteOne({token: token})
        res.sendStatus(204)
    } catch(error){
        next(error)
    }
}


export const deleteNotifications: RequestHandler = async (req, res, next) => {
    try{
        const userId = req.user.userId
        const user = await UserModel.findById(userId).exec()
        if(! user) throw new Error('An error occured')
        user.notifcation = []
        await user.save()
        res.sendStatus(204).json(user);
    } catch(error){
        next(error)
    }
    
}

