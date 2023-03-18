"use strict"

const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connected");
});

// parse requests of json type
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}))


// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse cookie in app
app.use(cookieParser())

// cross-origin request
var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, //for lagacy browser support
    default: process.env.FRONTEND_BASE_URL,
    credentials: true
};
app.use(cors(corsOptions))

// app.use(morgan('combined')

// register database model
require('./src/auth/model')

// routes
app.get('*', (req, res) => {
    res.send(`Dial *384*16009# on your moble phone to continue`)
})

app.use(require("./src/auth/route"));

// normalize port
const normalizePort = (val) => {
    let port = parseInt(val, 10)

    if (isNaN(port)) return val

    if (port >= 0) return port

    return false
}

// connect server
const PORT = normalizePort(process.env.PORT || "4000")
app.listen(PORT, (err) => {
    if (err) {
        console.log(err.message)
    }
    else {
        console.log(`Server Running on Port ${PORT}`)
    }
})
