const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors");
const app = express();
require('dotenv').config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const { mongooseConnect } = require("../database/dbConnect");
mongooseConnect();

app.use(express.json());
app.use(express.urlencoded({
    extended : true
}))

app.use(cookieParser());
const userRouter = require('../routes/User')
const applicationRouter = require('../routes/Application')
const jobRouter = require('../routes/Job')
app.use('/api/v1/user', userRouter)
app.use('/api/v1/application',applicationRouter)
app.use('/api/v1/job', jobRouter);
module.exports = app;