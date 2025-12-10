import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {ENV} from './config/env.js';
import authRouter from './routes/auth.routes.js';


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
}));


app.use("/api/auth",authRouter);


export default app;