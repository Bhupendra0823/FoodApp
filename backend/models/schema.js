const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    tableID: {
        type: Number,
        required: true,
        unique: true 
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    mobile: {
        type: Number,
        required: true,
        // unique: true
    },
    desireOrder: {
        type: Array,
        // required: true 
    } ,
    orderStatus :{
        type:String,
        default:"Pending"
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('customer', customerSchema);