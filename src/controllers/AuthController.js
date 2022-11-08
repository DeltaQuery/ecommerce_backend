
const userModel = require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.login = async (req, res, next) => {
    try {
        const secret = process.env.SECRET
        const user = req.user
        const payload = {
            sub: user._id,
            role: user.role
        }
        const token = jwt.sign(payload, secret)
        res.json({
            user,
            token
        })
    } catch (err) {
        next(err)
    }
}

exports.findByUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ user: req })
        if (user) return user
    } catch (err) {
        console.error(err)
    }

}

