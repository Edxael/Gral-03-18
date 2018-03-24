
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

    .get( async (req, res) => {
        let temp1 = await axios.get("http://api.openweathermap.org/data/2.5/weather?zip=" + req.params._id + ",us&APPID=a90a1769668d41f38e80d8ee118e7760")
        await res.send( temp1.data )
    })




    // THE SERVER LISTENER
// =============================================================================

app.listen(5000, (err) => {
    if(err) { throw err }
    console.log(" \n Edmundo's WEATHER-API  UP & RUNNING...")
})

