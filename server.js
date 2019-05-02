require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT
const Company = require('./models/company');
const ejs = require('ejs');
const methodOverride = require('method-override')
// const mongoose = require('mongoose')
const Driver = require('./models/driver');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/companys', {userNewUrlParser : true})
.then(()=>console.log("mongodb is running")
)

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));




// --------


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })