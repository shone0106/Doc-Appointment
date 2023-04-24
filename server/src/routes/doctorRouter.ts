import express  from "express";
import * as userController from '../controllers/userController'
import * as doctorController from '../controllers/doctorController'
import * as auth from '../middlewares/auth'

const router = express.Router()

router.get('/', auth.authenticate, doctorController.getDoctors)

router.post('/applyDoctor', auth.authenticate, doctorController.applyDoctor)

router.patch('/updateProfile/:doctorId', auth.authenticate, doctorController.updateProfile)

export default router