import express from "express";
import 'dotenv/config'

import cors from "cors"
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import http from "http"
import mongoose from "mongoose";
import router from "./router";

const app = express()


app.use(cors({
    credentials: true,
}))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log('server run http://localhost:8386/');

})

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGO || 'develop')

mongoose.connection.on('error', (err: Error) => console.log(err)
)

app.use('/api/', router())