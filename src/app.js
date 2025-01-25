import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) // configuring cors

// data can be from url, json, body format of form
// to configure this, we are doing this

app.use(express.json({limit: "16kb"})) // configuring json data, limiting its size
app.use(express.urlencoded({extended: true, limit: "16kb"})) // configuring url data
app.use(express.static("public")) // to store any file or pdf on my server publicly
app.use(cookieParser()) // configuring cookie parser

export {app}