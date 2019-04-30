require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT
const Company = require('./models/company');
const ejs = require('ejs');
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Driver = require('./models/driver');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/companys', {userNewUrlParser : true})
.then(()=>console.log("mongodb is running")
)

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));


//driver INDEX
app.get('/drivers', (req, res) => {
  Drivers.find()
  .sort('-createdAt')
  .populate({ path: 'driver', select: 'name' })
    .then(drivers => {
      res.render('drivers/index', { drivers })
    })
})

// driver new 
app.get('/drivers/new', (req, res) => {
  Driver.find()
    .then(drivers => {
      res.render('drivers/new', { drivers })
    })
})
//driver post 
app.post('/drivers', (req, res) => {
  let newDriver = new Driver(req.body)
if (!Array.isArray(req.body.driverCompanysArray)){
  newDriver.drivers.push(req.body.driverCompanysArray)
}else{
  req.body.driverCompanysArray.forEach(driver => {
    newDriver.drivers.push(driver)
  })
}
  newDriver.save()
  res.redirect('/drivers');
})
//driver SHOW
app.get('/drivers/:index', (req, res) => {
  Driver.findById(req.params.index)
  .populate({ path: 'drivers', select: 'name' })
  .then((driver)=>{
    res.render('drivers/show', {driver})
  })
})

// driver EDIT
app.get('/drivers/:index/edit', (req, res) => {
  let driver= []
  Driver.find()
  .then(i => {
    driver= i
  })
  Driver.findById(req.params.index)
    .then(driver => {
      res.render('drivers/edit', { driver,companys }) 
    })
})

// driver DELETE
app.delete('/drivers/:index', (req, res) => {
  Driver.findByIdAndDelete(req.params.index)
    .then(() => {
      res.redirect('/drivers');
    })
})

//driver PUT
app.put('/drivers/:index', (req, res) => {
  let updated = req.body
  Driver.findByIdAndUpdate(req.params.index, updated)
    .then(driver => {
      res.redirect(`/drivers/${driver._id}`);
    })
})


// --------

//INDEX company
app.get('/companys', (req, res) => {
  
  Company.find()
  .then((companys)=>{
    res.render('index', { companys })
  }).catch(err => console.log(err))

})

//NEW company
app.get('/companys/new', (req, res) => {
  res.render('new')
})


//POST company
app.post('/companys', (req, res) => {

  let data = {
    name: req.body.name, 
    color: req.body.color ,
    address: req.body.address,
    city: req.body.city,
    telephone :req.body.telephone
  }


  let company = new Company(data)
  company.save()
  .then(()=> {
    res.redirect('/companys')
  }).catch(err => console.log(err))

  
})

//SHOW company
app.get('/companys/:indexOfCompanysArray', (req, res) => {
  Company.findById(req.params.indexOfCompanysArray)
  .then((company)=>{
    res.render('show', {
      company : company
    })
  })
})

//EDIT company
app.get('/companys/:indexOfCompanysArray/edit', (req, res) => {
  Company.findById(req.params.indexOfCompanysArray)
    .then(company=> {
      res.render('edit', { company})
    })
})

//DELETE company
app.delete('/companys/:indexOfCompanysArray', (req, res) => {
  Company.findByIdAndDelete(req.params.indexOfCompanysArray)
    .then(() => {
      res.redirect('/companys');
    })
})


//PUT company
app.put('/companys/:indexOfCompanysArray', (req, res) => {
  companys[req.params.indexOfCompanysArray] = req.body;
  res.redirect('/companys');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })