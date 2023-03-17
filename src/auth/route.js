const express = require("express")
const authCrtl = require('./control')

const route = express.Router()

route.post("*", authCrtl.auth);




module.exports = route