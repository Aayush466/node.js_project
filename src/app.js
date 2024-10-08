import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser"

export const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:"true"}))
app.use(express.static("public"))

app.use(cookieParser())

//routes
import {router} from './routes/user.route.js'
//routes declaration 

app.use("/users",router)