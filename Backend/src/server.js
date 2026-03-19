// import express from "express"  ====>> "type": "module"
// or const express = require("express")
import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001


//middleware
app.use(express.json()) // parse the json bodis like req.body
app.use(rateLimiter)
// Simple custom middleware
// app.use((req, res, next) =>{
    //     console.log(`Requst method is ${req.method} and requst url is ${req.url}`);
    //     next();
    // })
    
    app.use("/api/notes", notesRouter);
    
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is started at port : ", PORT);
    });
});