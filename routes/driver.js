const express = require('express')
const router = express.Router()

// const Smoothie = require('../models/smoothie');
const Driver = require('../models/driver').Driver;


//driver INDEX
app.get('/', (req, res) => {
    Drivers.find()
    .sort('-createdAt')
    .populate({ path: 'driver', select: 'name' })
      .then(drivers => {
        res.render('drivers/index', { drivers })
      })
  })
  
  // driver new 
  app.get('/new', (req, res) => {
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
  app.get('/:index', (req, res) => {
    Driver.findById(req.params.index)
    .populate({ path: 'drivers', select: 'name' })
    .then((driver)=>{
      res.render('drivers/show', {driver})
    })
  })
  
  // driver EDIT
  app.get('/:index/edit', (req, res) => {
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
  app.delete('/:index', (req, res) => {
    Driver.findByIdAndDelete(req.params.index)
      .then(() => {
        res.redirect('/drivers');
      })
  })
  
  //driver PUT
  app.put('/:index', (req, res) => {
    let updated = req.body
    Driver.findByIdAndUpdate(req.params.index, updated)
      .then(driver => {
        res.redirect(`/drivers/${driver._id}`);
      })
  })
  