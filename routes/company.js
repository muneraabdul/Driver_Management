const express = require('express')
const router = express.Router()

// const Smoothie = require('../models/smoothie');
const Company = require('../models/company').Company;


//INDEX company
app.get('/companys', (req, res) => {
  
    Company.find()
    .then((companys)=>{
      res.render('index', { companys })
    }).catch(err => console.log(err))
  
  })
  
  //NEW company
  app.get('/new', (req, res) => {
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
  app.get('/:indexOfCompanysArray', (req, res) => {
    Company.findById(req.params.indexOfCompanysArray)
    .then((company)=>{
      res.render('show', {
        company : company
      })
    })
  })
  
  //EDIT company
  app.get('/:indexOfCompanysArray/edit', (req, res) => {
    Company.findById(req.params.indexOfCompanysArray)
      .then(company=> {
        res.render('edit', { company})
      })
  })
  
  //DELETE company
  app.delete('/:indexOfCompanysArray', (req, res) => {
    Company.findByIdAndDelete(req.params.indexOfCompanysArray)
      .then(() => {
        res.redirect('/companys');
      })
  })
  
  
  //PUT company
  app.put('/:indexOfCompanysArray', (req, res) => {
    companys[req.params.indexOfCompanysArray] = req.body;
    res.redirect('/companys');
  })
  