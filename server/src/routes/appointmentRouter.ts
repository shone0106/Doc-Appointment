import express from "express"
import * as appointmentController from '../controllers/appointmentController'
import { authenticate } from "../middlewares/auth"

const router = express.Router()

router.get('/userAppointments', authenticate, appointmentController.userAppointments)

router.get('/doctorAppointments', authenticate, appointmentController.doctorAppointments)

router.post('/makeAppointment', authenticate, appointmentController.makeAppointment)


