const express = require('express');
const session = require("express-session");
const restaurantRoute = require('./routes/ecg');
const path = require('path')
const dotenv = require('dotenv');
const cors = require('cors');

const app = express()



const { mongoose } = require("./config/mongoose");

app.get("*", (req,res)
)