    // LOADING DEPENDENCIES
// ===================================================
const keyPublishable = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'
const keySecret = 'sk_test_BQokikJOvBiI2HlWgH4olfQ2'

// const express = require('express')
// const app = express()
const app = require("express")()
const stripe = require("stripe")(keySecret)



    // ROUTING
// ===================================================
// app.use('/', router)
app.use(require('./headers'))

app.get("/", (req, res) => {
    res.render("index.pug", {keyPublishable})
} )



app.post("/charge", (req, res) => {
    // let amount = 500

    
    console.log(res.body)
    console.log("The request is type: ", typeof res)


    let myRes = { name: "Edmundo Rubio" }

    // res.send(req)
    // res.json({ message: 'Singer Record Created...' })
    // res.json({ message: "caleb" })
    res.send(myRes)

    // stripe.customers.create({
    //    email: req.body.stripeEmail,
    //   source: req.body.stripeToken
    // })
  
    // stripe.customers.create({
    //    email: req.body.stripeEmail,
    //   source: req.body.stripeToken
    // })
    // .then(customer =>
    //   stripe.charges.create({
    //     amount,
    //     description: "Sample Charge",
    //        currency: "usd",
    //        customer: customer.id
    //   }))
    // .then(charge => res.render("charge.pug"));
  })

  



    // SERVER LISTENER
// ===================================================
app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" \n UP & RUNNING...")
})
