const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name : {type: String, required : true},
    address: { type: String, required : true},
    city: { type: String, required : true},
    telephone: { type: String, required : true},
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }] ,
    drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drivers' }]
    },
{timestamps: true} )

const Company = mongoose.model('Company', companySchema)
module.exports = Company