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
    res.send(myRes)

  })

  



    // SERVER LISTENER
// ===================================================
app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" \n UP & RUNNING...")
})
