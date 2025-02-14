// const express = require('express');  //simple
import express from "express";   //react style
import dotenv from  "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js"
import emailRoute from "./routes/email.route.js"

dotenv.config({})
connectDB();  //always call after the config
const PORT = 8080;
const app = express();

// app.get("/home", (req, res)=>{
    // return res.status(200).json({message:"I am coming from backend", success:true })      //to check the backend is running or not
// })

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

//routes attached

app.use("/api/v1/user", userRoute)
app.use("/api/v1/email", emailRoute)

app.listen(PORT, ()=>{
    console.log(`Server running at  port ${PORT}`)
})

