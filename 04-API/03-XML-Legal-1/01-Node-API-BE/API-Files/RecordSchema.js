// var mongoose     = require('mongoose')
// var Schema       = mongoose.Schema

// var SingerSchema   = new Schema({
//     name: String
//     // email: String,
// });

// module.exports = mongoose.model('xmldb', SingerSchema)
// -------------------------------------------------------------


var mongoose     = require('mongoose')
var Schema       = mongoose.Schema

var LegalSchema   = new Schema({
    xml: String
    // email: String,
});

module.exports = mongoose.model('xmldb', LegalSchema)


