require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT
const Company = require('./models/company');
const ejs = require('ejs');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/company', {userNewUrlParser : true})
.then(()=>console.log("mongodb is running")
)

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

//INDEX
app.get('/companys', (req, res) => {
  
  Company.find()
  .then((companys)=>{
    res.render('index', { companys })
  }).catch(err => console.log(err))

})

//NEW
app.get('/companys/new', (req, res) => {
  res.render('new')
})


//POST
app.post('/companys', (req, res) => {

  let data = {
    name: req.body.name,
    address:req.body.address,
    city:req.body.city,
    telephone:req.body.telephone,
    driver:req.body.driver,
    car:req.body.car
  }

  let company = new Company(data)
  company.save()
  .then(()=> {
    res.redirect('/companys')
  }).catch(err => console.log(err))
})

//SHOW
app.get('/companys/:id', (req, res) => {
  Company.findById(req.params.id)
  .then((company)=>{
    res.render('show', {
      company: company
    })
  })
})

//PUT
app.put('/companys/:indexOfCompanysArray', (req, res) => {
  companys[req.params.indexOfCompanysArray] = req.body;
  res.redirect('/companys');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })