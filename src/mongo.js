require("dotenv").config()
const mongoose = require("mongoose")
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD

const connection = `mongodb+srv://${USER}:${PASSWORD}@cluster0.cvga0iw.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => { 
    console.log("Database connected")
}). catch(err => { 
    console.error(err)
})  