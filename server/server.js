//dotenv loads .env file data which can be accessed with process.env.xyz
//cors sets the acceptabale frontend ports allowed to communicte with the server (cross origin requesting)


import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from "./routes/auth.js"

dotenv.config();

//instance of express called 'app'
const app = express();

//middleware used 
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

//request body will arrive as json
app.use(express.json());
//takes cookie header and makes availale through req.cookies
app.use(cookieParser());

//mounts auth routes through /api/auth. anything starting /api/auth let authRoutes define
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000;

//starts server on port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});