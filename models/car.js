const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
        name :{type: String, required : true},
        model :{type: String, required : true},
        year :{type: String, required : true},
    },
{timestamps: true} )

const Car = mongoose.model('car', carSchema)
module.exports = Car