import express from 'express';
import imageRoute from './imageRoutes.js';
import authRoute from './authRoutes.js';
import userRoute from './userRoutes.js';

const rootRoute = express.Router();

rootRoute.use("/image", imageRoute);

rootRoute.use("/auth", authRoute);

rootRoute.use("/user", userRoute);

export default rootRoute;
