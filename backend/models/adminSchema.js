    const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    adminName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true,
        // unique: true
    },
    adminPassword: {
        type: String,
        required: true,
        // unique: true
    },
    adminPhone: {
        type: Number,
        required: true,
        // unique: true
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('admin', adminSchema);

