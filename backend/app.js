dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors";
import connectDB from "./DB_connection/connectDB.js";
import errorHandler from "./middlewares/errorHandler.js";
import {logger} from "./middlewares/logger.js";
import {corsOptions} from "./config/corsOptions.js";
const app = express();
const PORT = process.env.PORT || 8080;

//import all routes here

import authRouter from './routers/auth.js';

// console.log(corsOptions)

app.use(logger);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(errorHandler);

await connectDB();
app.use('/auth', authRouter);


app.listen(PORT , () => {
    console.log("Server started")
});

app.get('/check', async (req, res) => {
    try {
        res.status(200).json({
            "hello" : 'hello'
        })
    } catch (e) {
        res.status(500).json({
            "err" : e
        })
    }
})