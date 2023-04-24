import express, {Request, Response, NextFunction} from 'express'
import cookieparser from 'cookie-parser'
import createHttpError , { isHttpError }from "http-errors"
import userRouter from './routes/userRouter'
import doctorRouter from './routes/doctorRouter'


const app = express()
app.use(cookieparser())

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/doctor', doctorRouter)

app.use((req, res, next)=>{
    next(createHttpError(404, 'endpoint not found'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction)=>{
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage })
})

export default app
