    // call the packages we need
// =============================================================================
const express     = require('express');       
const app         = express()                
const bodyParser  = require('body-parser')
const db          = require('mongoose')
const parseString = require('xml2js').parseString
const xml2js = require('xml2js')
const SingerTemplate   = require('./API-Files/singerSchema')



    // Connection to database.
// =============================================================================
// db.connect('mongodb://admin1:Webaholics1@ds115569.mlab.com:15569/xml-1', (err) => {
db.connect('mongodb://master:Hkodoma48@ds121089.mlab.com:21089/legalxml', (err) => {
    if(err){ console.log(err) }else { console.log("Conected to DataBase.") }
})




    // Middleware
// =============================================================================
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('./API-Files/headers'))
const router = express.Router()             

router.use( (req, res, next) => {   
    console.log(" \n \n Request to the server detected.... \n=================================================")
    next(); 
})




    // ROUTES
// ===============================================================================
app.use('/api', router)      // all of our routes will be prefixed with /api
router.route('/singers')     // create a singer (accessed at POST http://localhost:5000/api/singers.


    .post( (req, res) => {
        console.log( 'Singer Record Created:\n', req.body.xml )

        const oneSinger = new SingerTemplate()
        parseString(req.body.xml, (err, result) => { oneSinger.name = result.SingerProfile.name[0] } )

        // oneSinger.save( (err) => {   
        //     if (err) { res.send(err) }
        //     res.json({ message: 'Singer Record Created...' })
        // })
    })


    
    .get( (req, res) => {   // get all the singers (accessed at GET http://localhost:5000/api/singers)
        SingerTemplate.find( (err, allSingers) => {
            if (err) { res.send(err) }
            res.json(allSingers)
            console.log("All records send to Client: \n ")
        })
    })

            // ------------------------------------------------------------

router.route('/singers/:_id')  
    
    .get( (req, res) => {  // http://localhost:5000/api/singers/5aab446b0f66102c6131b83b
        SingerTemplate.findById(req.params._id, (err, oneSinger) => {
            if (err) { res.send(err) }

            let temObj = {
                SingerProfile: {
                    Name: oneSinger.name,
                    id: JSON.stringify(oneSinger._id)
                }
            }

            let myBuilder = new xml2js.Builder()
            let myXML = myBuilder.buildObject(temObj)

            console.log('Record Send to client: \n ', myXML)
            res.send( myXML )   
        })
    })



    .put( (req, res) => {   // update the singer record with given id (accessed at PUT http://localhost:8080/api/singers/:_id)
        SingerTemplate.findById(req.params._id, (err, oneSinger) => {
            if (err) { res.send(err) }

            oneSinger.name = req.body.name;  // update the singer record
            oneSinger.save( (err) => {   // save the singer record
                if (err) { res.send(err) }
                res.json({ message: 'Singer Record updated!' })
                console.log('Record Updated...')
            })
        })
    })



    .delete( (req, res) => {  // delete a singer record using id (accessed at DELETE http://localhost:8080/api/singers/:_id)
        SingerTemplate.remove({
            _id: req.params._id
        }, (err, xmldb) => {
            if (err) { res.send(err) }
            res.json({ message: 'Record Successfully deleted' })
            console.log('Record Successfully deleted....')
        })
    })



// THE SERVER LISTENER
// =============================================================================

app.listen(5000, (err) => {
    if(err){ throw err }
    console.log(" ")
    console.log("API Up-&-Running.....")
})
