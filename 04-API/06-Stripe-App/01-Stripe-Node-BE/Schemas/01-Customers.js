var mongoose     = require('mongoose')
var Schema       = mongoose.Schema

var SingerSchema   = new Schema({
    name: String
//     country: String,
//     age: Number
});

module.exports = mongoose.model('customers', SingerSchema)
