require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const PORT = process.env.PORT
const app = express()


/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))



////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const {Schema, model} = mongoose

// make fruits schema
const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// make fruit model
const Fruit = model("Fruit", fruitsSchema)


/////////////////////////////////////////////////////
// Middleware
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("static")) // serve files from public statically


/////////////////////////////////////////////////////
// Routes
/////////////////////////////////////////////////////

app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})


app.get("/fruits/seed", (req, res) => {

    // array of starter fruits
    const startFruits = [
          { name: "Orange", color: "orange", readyToEat: false },
          { name: "Grape", color: "purple", readyToEat: false },
          { name: "Banana", color: "orange", readyToEat: false },
          { name: "Strawberry", color: "red", readyToEat: false },
          { name: "Coconut", color: "brown", readyToEat: false },
        ]
  
    // Delete all fruits
    Fruit.deleteMany({}, (err, data) => {
      // Seed Starter Fruits
      Fruit.create(startFruits,(err, fruits) => {

          // send created fruits as response to confirm creation
          res.json(fruits);
        }
      );
    });
  });

//   Callback Method
//   // index route
//   app.get("/fruits", (req, res) => {
//     Fruit.find({}, (err, fruits) => {
//       res.render("fruits/index.ejs", { fruits });
//     });
//   });
//   The .then Method
  // index route
  app.get("/fruits", (req, res) => {
    Fruit.find({})
    .then((fruits) => {
        console.log(fruits)
      res.render('fruits/index.ejs', { fruits }); 
    });
  });
//   The Async/Await Method
//   // index route
//   app.get("/fruits", async (req, res) => {
//     const fruits = await Fruits.find({});
//     res.render("fruits/index.ejs", { fruits });
//   });

// new route
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})


app.post('/fruits', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on'?true : false
    Fruit.create(req.body, (err, createdFruit) => {
        console.log(createdFruit)

        res.redirect('/fruits')
    })
})




app.get("/fruits/:id", (req, res) => {
    
    // find the particular fruit from the database
    Fruit.findById(req.params.id)
        .then((fruit) => {
            res.render('fruits/show.ejs',{fruit})
        })
        // res.render("fruits/show.ejs", {fruit})
    })





app.listen(PORT, () => console.log(`Who Let: ${PORT}`))