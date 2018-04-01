    // Test Keys to use on Development
// ===================================================
const keyPublishable = 'pk_test_IFYDACqD4HYsLjn9eZcB4x1B' // Using my pub.Key Here.
const keySecret = 'sk_test_' // SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS


    // LOADING DEPENDENCIES
// ===================================================
const app = require("express")()
const stripe = require("stripe")(keySecret)
// const stripe = require("stripe")(keyPublishable)
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
    // console.log(req.body)
    // console.log("The request is type: ", typeof res , " \n ")
    console.log("=======================================")
    const tokenID = req.body.tokenId
    console.log(tokenID)
    console.log("=======================================")
    


    // ----------------------------------------------------------------------------------
    // //  1 time Charge the user's card:  
    
    stripe.charges.create({
        amount: 1000,
        currency: "usd",
        description: "Example charge",
        source: tokenID,
    }, (err, charge) => {
        // asynchronously called

        if(err){
            console.log("==============================")
            console.log("  Error: ", err )
            res.send({
                success: false,
                message: "Error :( ..."
            })
        }else{
            console.log("==============================")
            console.log("  Charge: ", charge )

            res.send({
                success: true,
                message: "Success  ;) ..."
            })
        }
    });



}) //-------------------------------------------------------------------------------------------------------
  




    // SERVER LISTENER
// ===================================================
app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" \n UP & RUNNING...")
})
