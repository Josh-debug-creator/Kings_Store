// const express = require("express");
import express from 'express'
// const mongoDbConnection = require("./Config/db.config");
import mongoDbConnection from './Config/db.config.js'
const app = express();
// const routeHandler = require("./Routes");
import cors from 'cors'
import bodyParser from 'body-parser';
import routeHandler from './Routes/index.js'
mongoDbConnection();


app.use(cors({origin:true, credentials:true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use("/", routeHandler);

app.use("*", (req, res, err) => {
  res.status(404).json("ROUTE NOT FOUND");
  console.log(err);
});

// module.exports = app
export default app
