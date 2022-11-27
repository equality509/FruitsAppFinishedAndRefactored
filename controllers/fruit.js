const express = require('express')
const Fruit = require('../models/fruit')


const router = express.Router()

/////////////////////////////////////////////////////
// Routes
/////////////////////////////////////////////////////

router.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})




//   Callback Method
//   // index route
//   router.get("/fruits", (req, res) => {
//     Fruit.find({}, (err, fruits) => {
//       res.render("fruits/index.ejs", { fruits });
//     });
//   });
//   The .then Method
  // index route
  router.get("/fruits", (req, res) => {
    Fruit.find({})
    .then((fruits) => {
        console.log(fruits)
      res.render('fruits/index.ejs', { fruits }); 
    });
  });
//   The Async/Await Method
//   // index route
//   router.get("/fruits", async (req, res) => {
//     const fruits = await Fruits.find({});
//     res.render("fruits/index.ejs", { fruits });
//   });

// new route
router.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})


router.post('/fruits', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on'?true : false
    Fruit.create(req.body, (err, createdFruit) => {
        console.log(createdFruit)

        res.redirect('/fruits')
    })
})


router.get('/fruits/:id/edit', (req, res) => {

  const id = req.params.id

  Fruit.findById(id, (err, foundFruit) => {
    res.render('fruits/edit.ejs', { fruit: foundFruit})
  })
})

router.put('/fruits/:id', (req, res) => {

  req.body.readyToEat = req.body.readyToEat === 'on'?true : false


  Fruit.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, updatedFruit) => {

    res.redirect(`/fruits/${req.params.id}`)
  })
})

router.get("/fruits/:id", (req, res) => {
    
    // find the particular fruit from the database
    Fruit.findById(req.params.id)
        .then((fruit) => {
            res.render('fruits/show.ejs',{fruit})
        })
        // res.render("fruits/show.ejs", {fruit})
    })


router.delete('/fruits/:id', (req, res) => {

  Fruit.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
    console.log(err, deletedFruit)
    res.redirect('/fruits')
  })
})


module.exports = router