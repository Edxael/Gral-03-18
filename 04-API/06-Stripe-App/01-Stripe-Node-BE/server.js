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



    // DataBase Connection (zadmin) => { Hk...48 }
// ===================================================
db.connect('mongodb://zadmin:Hkodoma48@ds231199.mlab.com:31199/sflix', (err) => {
    if(err){ console.log(err) }else { console.log("Conected to DataBase.") }
})




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

