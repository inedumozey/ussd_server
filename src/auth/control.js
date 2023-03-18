const mongoose = require('mongoose')
const User = mongoose.model("User");

require("dotenv").config();

const bcrypt = require("bcrypt");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window)

module.exports = {
    auth: async (req, res) => {

        let { sessionId, serviceCode, phoneNumber, text } = req.body

        if (text == '') {
            // This is the first request. Note how we start the response with CON
            let response = `
                                CON What would you want to check
                                1. My Account
                                2. My phone number
                            `
            res.send(response)
        } else if (text == '1') {
            // Business logic for first level response
            let response = `CON Choose account information you want to view
    1. Account number
    2. Account balance`
            res.send(response)
        } else if (text == '2') {
            // Business logic for first level response
            let response = `END Your phone number is ${phoneNumber}`
            res.send(response)
        } else if (text == '1*1') {
            // Business logic for first level response
            let accountNumber = 'ACC1001'
            // This is a terminal request. Note how we start the response with END
            let response = `END Your account number is ${accountNumber}`
            res.send(response)
        } else if (text == '1*2') {
            // This is a second level response where the user selected 1 in the first instance
            let balance = 'NGN 10,000'
            // This is a terminal request. Note how we start the response with END
            let response = `END Your balance is ${balance}`
            res.send(response)
        } else {
            res.status(400).send('Bad request!')
        }
        try {
            // const data = await User.find({}).select("-password");

        }
        catch (err) {
            return res.status(500).json({ status: false, msg: err.message || "Server error, please contact customer support" })
        }
    },
}
