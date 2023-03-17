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
        try {
            const data = await User.find({})
                .select("-password");

            return res.status(200).json({ status: true, msg: "successfull", data })
        }
        catch (err) {
            return res.status(500).json({ status: false, msg: err.message || "Server error, please contact customer support" })
        }
    },
}
