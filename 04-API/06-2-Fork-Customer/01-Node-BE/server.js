    // Test Keys to use on Development
// ===================================================
const keyPublishable = 'pk_test_IFYDACqD4HYsLjn9eZcB4x1B' // Using my pub.Key Here.
const keySecret = 'sk_test_uzgyHUbwXma' // SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS


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
    


    // //  Creating a customer.. 
    const customer1 = stripe.customers.create({
        email: req.body.xinfo.email
        })

    customer1.then((StripeCustomerData) => { 
        console.log("The promise: ", StripeCustomerData) 

        const oneCustomer = new CustomerTemp()      // create a new instance of the Singer model
        oneCustomer.name = req.body.xinfo.name
        oneCustomer.email = req.body.xinfo.email
        oneCustomer.password = req.body.xinfo.password
        oneCustomer.acctype = "customer"
        oneCustomer.package = "none"
        oneCustomer.stripeid = StripeCustomerData.id

        
        oneCustomer.save( (err) => {   // save the customer and check for errors
            if (err) { res.send(err) }
            console.log("Succesful creation of account for: ", oneCustomer.name , ". \n " )
            res.json({ message: 'Customer Record Created: ', cdata: oneCustomer})
        })
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



//------[ 1 time Charge card  ]--------------------------------------------------------------------------------
app.post("/charge", (req, res) => {
    // console.log(req.body)
    // console.log("The request is type: ", typeof res , " \n ")
    console.log("=======================================")
    const tokenID = req.body.tokenId
    console.log(tokenID)
    console.log("=======================================")
    

            // ---------------------------------------------------------
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




//------[ Update Customer Account  ]--------------------------------------------------------------------------------
router.route('/customers/:email').put( (req, res) => { 

    CustomerTemp.findOne( { email: req.params.email } , (err, customerRecord) => {
        if (err) { res.send(err) }
        console.log('Customer : ', customerRecord , " \n ============================= \n " )
        console.log("new data to update: ", req.body.name)
        console.log(" \n ==================================== \n ")

        customerRecord.name = req.body.name
        console.log("Record with new name: ", customerRecord)

        customerRecord.save( (err) => {   // save customer record
            if (err) { res.send(err) }
            // res.json({ message: 'Customer Record updated!', type: 1 })
            res.json(customerRecord)
            console.log('Record Updated...')
        }) 
    })
}) //-------------------------------------------------------------------------------------------------------




//------[ Subcriptions Charge card  ]--------------------------------------------------------------------------------

        // ********* Creating Plans  *************
const plan1 = stripe.plans.create({
    product: {name: "Bronze Package"},
    currency: 'usd',
    interval: 'month',
    nickname: 'Bronze Monthly',
    amount: 10000,
  })

  const plan2 = stripe.plans.create({
    product: {name: "Silver Package"},
    currency: 'usd',
    interval: 'month',
    nickname: 'Silver Monthly',
    amount: 10000,
  })

  const plan3 = stripe.plans.create({
    product: {name: "Gold Package"},
    currency: 'usd',
    interval: 'month',
    nickname: 'Gold Monthly',
    amount: 10000,
  })
    
//------------------------------------------------------------------------------------------------------------------



  




    // SERVER LISTENER  --  YdkxhNFXE6WNJ
// ===================================================
app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" \n UP & RUNNING...")
})

