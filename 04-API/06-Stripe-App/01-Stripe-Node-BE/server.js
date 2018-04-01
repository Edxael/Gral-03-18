    // Test Keys to use on Development
// ===================================================
const keyPublishable = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'
const keySecret = 'sk_test_BQokikJOvBiI2HlWgH4olfQ2'


    // LOADING DEPENDENCIES
// ===================================================
const app = require("express")()
const stripe = require("stripe")(keySecret)
const bodyParser = require('body-parser')
const db = require('mongoose')
const CustomerTemp = require('./Schemas/01-Customers')
const express     = require('express') 
const cors = require('cors')


// ********************  Authentication  ****************************
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const multer = require('multer')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const dbcx = db.Connection



    // Hnadle session
app.use(session( {
    secret: 'secret',
    saveUninitialized: true,
    resave: true
} ))

    // Passport
app.use(passport.initialize())
app.use(passport.session())

    // Validator
const expressValidator = require('express-validator')
// app.use(expressValidator(middlewareOptions))
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      }
    }
  }))



    // Express-Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});













// ********************************************************************






    // DataBase Connection (zadmin) => { Hk...48 }
// ===================================================
db.connect('mongodb://zadmin:Hkodoma48@ds231199.mlab.com:31199/sflix', (err) => {
    if(err){ console.log(err) }else { console.log("Conected to DataBase.") }
})




    // Recurring Charges Plans
// ===================================================





    // MIDLEWARE
// ===================================================

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('./headers'))
const router = express.Router() 





    // ROUTING
// ===================================================
app.use('/', router)
// app.get("/", (req, res) => {
//     res.render("index.pug", {keyPublishable})
// } )

router.route('/customers').post( (req, res) => {  // Create a new singer and save it on the db.
    const oneCustomer = new CustomerTemp()      // create a new instance of the Singer model
    oneCustomer.name = req.body.xinfo.name
    oneCustomer.email = req.body.xinfo.email
    oneCustomer.password = req.body.xinfo.password
    oneCustomer.acctype = "customer"
    oneCustomer.package = "none"
    console.log("User info to save on DB: ", oneCustomer )
    
    oneCustomer.save( (err) => {   // save the customer and check for errors
        if (err) { res.send(err) }
        res.json({ message: 'Customer Record Created: ', cdata: oneCustomer})
    })
})




// router.route('/customers/:_id').get( (req, res) => {  // http://localhost:5000/api/singers/5aab446b0f66102c6131b83b
    
//     console.log("Searching on dataBase: \n ")
//     console.log(req.params._id)
//     console.log(typeof req.params._id)
//     console.log(" ")

//     // CustomerTemp.findById(req.params._id, (err, customerRecord) => {
//     CustomerTemp.findOne( { email: req.params._id} , (err, customerRecord) => {
//         if (err) { res.send(err) }

//         console.log('Record Send to client: \n ', customerRecord)
//         res.send( customerRecord )   
//     })
// })



router.route('/customers/:email').get( (req, res) => {  // http://localhost:5000/api/singers/5aab446b0f66102c6131b83b
    
    console.log("Searching on dataBase: \n ")
    console.log(req.params.email)
    console.log(typeof req.params.email)
    console.log(" ")

    // CustomerTemp.findById(req.params._id, (err, customerRecord) => {
    CustomerTemp.findOne( { email: req.params.email} , (err, customerRecord) => {
        if (err) { res.send(err) }

        console.log('Record Send to client: \n ', customerRecord)
        res.send( customerRecord )   
    })
})


  


    // SERVER LISTENER
// ===================================================
app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" \n UP & RUNNING...")
})





// app.post("/charge", (req, res) => {
//     console.log(req.body)
//     console.log("The request is type: ", typeof res , " \n ")
//     let myRes = { name: "Edmundo Rubio" }
//     res.send(myRes)
//   })

