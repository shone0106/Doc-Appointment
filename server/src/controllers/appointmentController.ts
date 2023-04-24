import { RequestHandler } from "express";
import mongoose from "mongoose";
import AppointmentModel from "../models/Appointment";
import DoctorModel from "../models/Doctor";


interface Appointment{
    userId: mongoose.Schema.Types.ObjectId;
    doctorId: mongoose.Schema.Types.ObjectId;
    doctorInfo: string;
    userInfo: string;
    date: string;  
    time: string;
    status: string;
}

export const makeAppointment: RequestHandler<unknown, unknown, Appointment, unknown> = async (req, res, next) => {
    
    // if no availability send res not available

    // if available
    // set appointment status to pending
    // create new appintment instance and send it as res
}

export const userAppointments: RequestHandler = async (req, res, next) => {
    try{

        const appointments = await AppointmentModel.find({userId: req.user.userId}).exec()
        res.status(201).send(appointments)

    } catch(error){
        next(error)
    }
}

export const doctorAppointments: RequestHandler = async (req, res, next) => {
    try{
        const userId = req.user.userId
        const doctor = await DoctorModel.findOne({userId: userId})
        if(! doctor) throw new Error('something went wrong')
        const appointments = await AppointmentModel.find({doctorId: doctor._id}).exec()
        res.status(201).send(appointments)
        
    } catch(error){
        next(error)
    }
}