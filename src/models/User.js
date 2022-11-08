const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    user: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v 
        delete returnedObject.password
    }
})

const User = model("User", userSchema)

module.exports = User