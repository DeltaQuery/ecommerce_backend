const userModel = require("../models/User")
const bcrypt = require("bcrypt")

exports.findAll = async (req, res) => {
    await userModel.find({})
        .then(users => {
            res.json(users)
        })
}

exports.findById = async (req, res, next) => {
    const { id } = req.params

    await userModel.findById(id)
        .then(user => {
            if (user) return res.json(user)
            res.status(404).end()
        })
        .catch(err => {
            next(err)
        })
}

//This is just for AuthController
exports.findByUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await userModel.findOne({ user: id })
        if (user) return res.json(user)
        res.status(404).end()
    } catch(err){
        next(err)
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const { body } = req
        const { user, role, password } = body
    
        const passwordHash = await bcrypt.hash(password, 10)
    
        const newUser = new userModel({
            user,
            role,
            password: passwordHash
        })
    
        const savedUser = await newUser.save()

        res.status(201).json({
            message: "User saved!",
            data: savedUser
        })
    } catch(err) {
        next(err)
    }   
}

exports.updateUser = async (req, res, next) => {
    try {
       const { id } = req.params  
       if(!id) res.status(404).send("No user found!")
       const user = req.body
       let passwordHash = user.password

       if(user.hasOwnProperty("password")){
        passwordHash = await bcrypt.hash(user.password, 10)
       }

       const newUserInfo = {
        user: user.user,
        role: user.role,
        password: passwordHash
       }

       userModel.findByIdAndUpdate(id, newUserInfo, { new: true })
       .then(() => {
        res.status(200).send("User updated!")
       })
    } catch(err) {
        next(err)
    }
    
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        if(!user) res.status(404).send("No user found!")
        res.status(200).send("User deleted!")
    } catch(err){
        next(err)
    }
}