require("dotenv").config()

const API_KEY = process.env.API_KEY

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api']
  if (apiKey === API_KEY) {
    next()
  } else {
    res.status(401).send("User not authorized!")
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user
  if (user && user?.role === 'admin') {
    next()
  } else {
    res.status(401).send("User role not authorized!")
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user
    if (user && roles?.includes(user.role)) {
      next()
    } else {
      res.status(401).send("User role not authorized!")
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }
