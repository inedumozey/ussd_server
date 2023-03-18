const mongoose = require('mongoose')
const User = mongoose.model("User");

require("dotenv").config();

const bcrypt = require("bcrypt");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window)

let response = {
    no_account: `END Account not found!`,
    init: `
        CON Welcome to eTrans
        1. Transfer
        2. My Account
        3. Withdraw
    `,
    account: `
        CON Choose account information you want to view
        1. Account Balance
        2. Account Number
        3. Create New Account
    `,
}

const regex = /2*3^[4]/g

module.exports = {
    auth: async (req, res) => {
        let { sessionId, serviceCode, phoneNumber, text } = req.body

        if (text === '') {
            // This is the first request. Note how we start the response with CON
            res.send(response.init)
        }

        // Business logic for first level response: Transfer
        else if (text === "1") {
            // transfer
            const user = await User.findOne({ phoneNumber: phoneNumber });

            if (!user) {
                res.send(response.no_account)
            }
            else {
                res.send("END This function is pending...")
            }
        }



        // Business logic for first level response: Account
        else if (text === "2") {
            // Acount info
            res.send(response.account)
        }

        // Business logic for second level response: Check Account Balance
        else if (text === "2*1") {
            const user = await User.findOne({ phoneNumber });

            if (!user) {
                res.send(response.no_account)
            }
            else {
                res.send(`END Your Account Balance is ${user.currency} ${user.balance}`)
            }
        }

        // Business logic for second level response: Check Account Number
        else if (text === "2*2") {
            const user = await User.findOne({ phoneNumber });

            if (!user) {
                res.send(response.no_account)
            }
            else {
                res.send(`END Your account number is ${user.accountNumber}`)
            }
        }

        // Business logic for second level response: Create new Account
        else if (text === "2*3") {
            res.send("CON Enter your Mobile Number and a 4 DigitsPpin in this format: Number*Pin")
        }

        else if (text.includes("2*3")) {
            const user = await User.findOne({ phoneNumber });

            if (user) {
                res.send(`END Account already exist!`)
            }

            const phone = text.split("*")[2]
            const pin = text.split("*")[3]
            const accountNumber = phone.substring(phone.length, phone.length - 10)

            if (accountNumber.length !== 10) {
                res.send("CON Invalid Mobile Number! >> Enter your Mobile Number and a 4 DigitsPpin in this format: Number*Pin")
            }

            if (pin.length !== 4) {
                res.send("CON Invalid Pin! >> Enter your Mobile Number and a 4 DigitsPpin in this format: Number*Pin")
            }

            const pinHarshed = await bcrypt.hash(pin, 10)
            const newuser = new User({
                accountNumber,
                phoneNumber: phoneNumber,
                pin: pinHarshed
            })

            await newuser.save()
            res.send(`
                    END Congratulations!!!
                    Account Number: ${newuser.accountNumber}
                    Account Balance:  ${newuser.currency} ${newuser.balance}

                `
            )
        }


        // +2348036000347


        // Business logic for first level response: Withdraw
        else if (text === "3") {
            // transfer
            const user = await User.findOne({ phoneNumber });

            if (!user) {
                res.send(response.no_account)
            }
            else {
                res.send("END This function is pending...")
            }
        }
    },
}
