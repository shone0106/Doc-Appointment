import express  from "express";
import * as userController from '../controllers/userController'
import * as auth from '../middlewares/auth'

const router = express.Router()

router.get('/', auth.authenticate, userController.getAuthenticatedUser)

router.get('/token/refresh', userController.getNewAccessToken)

router.post('/signUp', userController.signUp)

router.post('/login', userController.login)

router.post('/token/logout', userController.logout)

export default router
