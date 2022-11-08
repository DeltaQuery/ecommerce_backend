const { Strategy } = require("passport-local")
const authController = require("../../../controllers/AuthController")
const bcrypt = require("bcrypt")


const LocalStrategy = new Strategy({
  usernameField: 'user',
  passwordField: 'password'
},
  async (user, password, done) => {
    try {
      const foundUser = await authController.findByUser(user)
      if (!foundUser) {
        done(null, false)
      }
      const isMatch = await bcrypt.compare(password, foundUser.password)
      if (!isMatch) {
        done(null, false)
      }
      done(null, foundUser)
    } catch (err) {
      done(err, false)
    }
  })

module.exports = LocalStrategy