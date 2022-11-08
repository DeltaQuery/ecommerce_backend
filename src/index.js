require("dotenv").config()
require("./mongo")
const express = require("express")
const customerRoutes = require("./routes/CustomerRoutes")
const invoiceRoutes = require("./routes/InvoiceRoutes")
const productRoutes = require("./routes/ProductRoutes")
const studentRoutes = require("./routes/StudentRoutes")
const authRoutes = require("./routes/AuthRoutes")
const userRoutes = require("./routes/UserRoutes")
const rateRoutes = require("./routes/RateRoutes")
const app = express()
const cors = require("cors")
const { logErrors, errorHandler } = require("./middlewares/error.handler")
//const handleErrors = require("./middleware/handleErrors.js")

app.use(cors()) 
/*Cors limitado a ciertas ip (por ejemplo mi frontend)
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));*/
app.use(express.json())
//app.use("/images", express.static("images"))
require("./utils/auth/index")

app.get("/", (request, response) => {
    response.send("Hello world!")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/products', productRoutes)  
app.use('/api/invoices', invoiceRoutes)
app.use("/api/rate", rateRoutes)

app.use(logErrors)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

