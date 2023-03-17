const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        account: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
        amount: {
            type: Number,
            trim: true,
            default: 0,
        },
        currency: {
            type: String,
            default: 'NGN'
        },
        isBlocked: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)
mongoose.model("User", schema);