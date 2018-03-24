console.log("Hello from here...")
    // Loading dependencies into variables
// ====================================================================
const Express = require('express')
const app = Express()
const db = require('mongoose')
const axios = require('axios')
const router = Express.Router()


app.use(require('./headers'))


    // Routing
// ====================================================================
router.use( (req, res, next) => {
    console.log(" \n \n Request to the server detected.... \n=================================================")
    next()
})


app.use('/api', router)      // all of our routes will be prefixed with /api
router.route('/zipcode/:_id') 
    .get((req, res) => {
        console.log("The zipcode to search: ", req.params._id)


        let zipCode = req.params._id
        let temp1 = {}
        axios.get("http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&APPID=a90a1769668d41f38e80d8ee118e7760")
            .then((response) => { temp1 = response.data  })
            
        setTimeout(() => {
            console.log("Data received from the WEATHER-API:")
            console.log(typeof temp1)
            console.log(" ")
            console.log(temp1)

            res.send( temp1 )
        }, 250)
    })















// let zipCode = '85732'
// let temp1 = 'mp'
// axios.get("http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&APPID=a90a1769668d41f38e80d8ee118e7760")
//     .then((response) => { temp1 = response.data  })
    
// setTimeout(() => {
//     console.log("Data received from the WEATHER-API:")
//     console.log(typeof temp1)
//     console.log(" ")
//     console.log(temp1)
// }, 500)









    // THE SERVER LISTENER
// =============================================================================

app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" \n Edmundo's WEATHER-API  UP & RUNNING...")
})