import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import DoctorModel from '../models/Doctor'
import UserModel from '../models/User'


interface DoctorData{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    addressstring: string;
    specialization: string;
    experience: string;
    feesPerCunsaltation: number;
    status: string;
    timings: object;
}

export const applyDoctor: RequestHandler<unknown, unknown, DoctorData, unknown> = async (req, res, next) =>{
    try{
        const newDoc = await DoctorModel.create({ ...req.body, userId: req.user.userId })
        res.status(201).json(newDoc);
    } catch(error){
        next(error)
    }
}


export const getDoctors: RequestHandler = async (req, res, next) => {
    try{
        const doctors = await DoctorModel.find({ status: "approved" }).exec()
        res.status(200).json(doctors)
        }
        catch(error){
            next(error)        
        }
}

interface UpdateParams{
    doctorId: string;
}

export const updateProfile: RequestHandler<UpdateParams, unknown, DoctorData, unknown> = async (req, res, next) => {
    try{
        const doctorId = req.params.doctorId
        const userId = req.user.userId

        if (!mongoose.isValidObjectId(doctorId)) {
            throw createHttpError(400, "Invalid doctor id");
        }

        const doctor = await DoctorModel.findById(doctorId).exec()

        if (!doctor) {
            throw createHttpError(404, "Coudn't find doctor");
        }
        if (!doctor.userId.equals(userId)) {
            throw createHttpError(401, "You are not authorized");
        }

        const updatedData = {...req.body, status: doctor.status }

        const updatedDoctor = await DoctorModel.findOneAndUpdate({_id: doctorId}, updatedData, {new: true}).exec();
        res.status(200).json(updatedDoctor)
        }
        catch(error){
            next(error)        
        }
}