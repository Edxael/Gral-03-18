    // Test Keys to use on Development
// ===================================================
const keyPublishable = 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'
const keySecret = 'sk_test_BQokikJOvBiI2HlWgH4olfQ2'


    // LOADING DEPENDENCIES
// ===================================================
const app = require("express")()
const stripe = require("stripe")(keySecret)
const bodyParser = require('body-parser')




    // Recurring Charges Plans
// ===================================================





    // ROUTING
// ===================================================
// app.use('/', router)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('./headers'))



// app.get("/", (req, res) => {
//     res.render("index.pug", {keyPublishable})
// } )



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





    // Links to more info..
// ===================================================
// The authentication and user registration: <user Loging system>
// https://www.udemy.com/learn-nodejs-by-building-10-projects/learn/v4/content

// Posible second option for WebAuthentication: { Adding Authentication }
// https://www.udemy.com/the-complete-node-js-developer-course/learn/v4/content

// Example of implementing charges with stripe in node: 
// https://www.udemy.com/node-with-react-fullstack-web-development/learn/v4/content

