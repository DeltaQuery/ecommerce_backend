const express = require('express')
const uploadRoutes = express.Router()
const passport = require("passport")
require("../utils/auth/index")
const { storage } = require('../storage/storage')
const multer = require('multer')
const cloudinary = require("cloudinary")
const upload = multer({ storage })
const { checkAdminRole } = require("../middlewares/auth.handler")

uploadRoutes.post('/', passport.authenticate("jwt", {session: false}), checkAdminRole, upload.single('file'), async (req, res, next) => {
    try {
     const upload = await cloudinary.v2.uploader.upload(req.file.path)
    return res.json({
        success: true,
        file: upload.secure_url,
    })   
    } catch(err){
        next(err)
    }
    
})

module.exports = uploadRoutes