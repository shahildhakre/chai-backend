// require('dotenv').config({path: './env'}) // not good for code consistency, better 
                                            // is to use import syntax

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
    path: './.env'
})


connectDB() // asynchronous method return a promise, hence then and catch
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`); 
    })
})
.catch((error) => {
    console.log("MONGO db connection failed !! ", error);
})




/*
// In this, we are writing the code of database connection in index.js itself,but
this pollutes the index.js file

import mongoose from "mongoose";
import {DB_NAME} from "./constants";

import express from "express"
const app = express()

// While connecting to database, always use:
// - async-await(as database is in another continent, so takes time), and 
// - try-catch(because so many problems occur) 


// iffies
( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // listener
        app.on("error", (error)=>{
            console.log("ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.error("ERROR: ", error);
        throw error
    }
})()
*/