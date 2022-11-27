require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const PORT = process.env.PORT
const app = express()
const Fruit = require('./models/fruit')
const FruitRouter = require('./controllers/fruit')



/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("static")) // serve files from public statically
app.use(FruitRouter)



app.listen(PORT, () => console.log(`Who Let: ${PORT}`))