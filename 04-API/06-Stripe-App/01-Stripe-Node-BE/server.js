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
const router = require('express').Router() 



    // DataBase Connection (zadmin) => { Hk...48 }
// ===================================================
db.connect('mongodb://zadmin:Hkodoma48@ds231199.mlab.com:31199/sflix', (err) => {
    if(err){ console.log(err) }else { console.log("Conected to DataBase.") }
})




    // Recurring Charges Plans
// ===================================================





    // ROUTING
// ===================================================
app.use('/', router)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('./headers'))



// app.get("/", (req, res) => {
//     res.render("index.pug", {keyPublishable})
// } )

router.route('/customers').post( (req, res) => {  // Create a new singer and save it on the db.

    console.log("Request to create user.......");
    
    // console.log( "The REQ: ", req.body )
    

    // const oneCustomer = new CustomerTemp()      // create a new instance of the Singer model
    // oneCustomer.name = req.body.name
    // oneCustomer.email = req.body.email
    // oneCustomer.password = req.body.password

    // neCustomer.save( (err) => {   // save the customer and check for errors
    //     if (err) { res.send(err) }
    //     res.json({ message: 'Record Created for singer: ' + oneSinger.name })
    // })
    res.json({ message: "Sucess" })
})



app.post("/charge", (req, res) => {

    console.log(req.body)
    console.log("The request is type: ", typeof res , " \n ")


    let myRes = { name: "Edmundo Rubio" }
    res.send(myRes)

  })

  


    // SERVER LISTENER
// ===================================================
app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" \n UP & RUNNING...")
})







