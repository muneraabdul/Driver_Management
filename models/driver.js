const mongoose = require('mongoose')
const Schema = mongoose.Schema

const driverSchema = new Schema({
            name :{type: String, required : true},
            age : {type: String, required : true},
            cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
        
    },
{timestamps: true} )

const Driver = mongoose.model('driver', driverSchema)
module.exports = Driver