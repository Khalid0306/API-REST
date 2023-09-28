const mongoose = require('mongoose');
const Schema =  mongoose.Schema; 

const contactSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    phonenumber: String,
});

module.exports = mongoose.model('Contact', contactSchema);