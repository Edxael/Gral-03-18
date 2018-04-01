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


//------[ To Create New User ]--------------------------------------------------------------------------------
router.route('/customers').post( (req, res) => {  // Create a new singer and save it on the db.
    const oneCustomer = new CustomerTemp()      // create a new instance of the Singer model
    oneCustomer.name = req.body.xinfo.name
    oneCustomer.email = req.body.xinfo.email
    oneCustomer.password = req.body.xinfo.password
    oneCustomer.acctype = "customer"
    oneCustomer.package = "none"
    
    oneCustomer.save( (err) => {   // save the customer and check for errors
        if (err) { res.send(err) }
        console.log("Succesful creation of account for: ", oneCustomer.name , ". \n " )
        res.json({ message: 'Customer Record Created: ', cdata: oneCustomer})
    })
}) //---------------------------------------------------------------------------------------------------------


//------[ To log-in by Email ]--------------------------------------------------------------------------------
router.route('/customers/:email').get( (req, res) => {  
    CustomerTemp.findOne( { email: req.params.email} , (err, customerRecord) => {
        if (err) { res.send(err) }
        console.log('Customer : ', customerRecord.name , " Succesful Log-In \n " )
        res.send( customerRecord )   
    })
}) //---------------------------------------------------------------------------------------------------------


//------[ To Charge card  ]--------------------------------------------------------------------------------
app.post("/charge", (req, res) => {
    console.log(req.body)
    console.log("The request is type: ", typeof res , " \n ")
    let myRes = { name: "Edmundo Rubio" }
    res.send(myRes)
  }) //-------------------------------------------------------------------------------------------------------
  


  

    // SERVER LISTENER
// ===================================================
app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" \n UP & RUNNING...")
})


// =================================================================
// Review of the body of the req

{ 
    token: 
        {   id: 'tok_1CBzC32eZvKYlo2CvoMRHM33',
            object: 'token',
            card: { 
                    id: 'card_1CBzC22eZvKYlo2CRnnxlzBP',
                    object: 'card',
                    address_city: null,
                    address_country: null,
                    address_line1: null,
                    address_line1_check: null,
                    address_line2: null,
                    address_state: null,
                    address_zip: null,
                    address_zip_check: null,
                    brand: 'Visa',
                    country: 'US',
                    cvc_check: 'pass',
                    dynamic_last4: null,
                    exp_month: 2,
                    exp_year: 2019,
                    funding: 'credit',
                    last4: '4242',
                    metadata: {},
                    name: 'bora@singer.com',
                    tokenization_method: null 
                },
            client_ip: '73.131.246.131',
            created: 1522562251,
            email: 'bora@singer.com',
            livemode: false,
            type: 'card',
            used: false 
        },
    customer: 
        {    _id: '5ac05964ea87cc092261d571',
            name: 'Bora Yoon',
            email: 'bora@one.com',
            password: 'bora123',
            acctype: 'customer',
            package: 1,
            __v: 0 
        },
    package: 2 
}

// =================================================================