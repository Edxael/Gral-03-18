    // call the packages we need
// =============================================================================
const express     = require('express');       
const app         = express()                
const bodyParser  = require('body-parser')
const db          = require('mongoose')
const parseString = require('xml2js').parseString
const xml2js = require('xml2js')
const RecordTemplate   = require('./API-Files/RecordSchema')



    // Connection to database.
// =============================================================================
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
router.route('/records')     // create a singer (accessed at POST http://localhost:5000/api/records.


    .post( (req, res) => {

        let myTemp = req.body.xml
        console.log(myTemp)
        console.log(typeof myTemp)

        const oneRecord = new RecordTemplate()
        console.log("One Record: ", oneRecord)
        oneRecord.xml = myTemp
        console.log("One Record: ", oneRecord.xml)
        console.log("One Record: ", oneRecord)

        oneRecord.save( (err) => {   
            if (err) { res.send(err) }
            res.json({ message: 'Legal Record Created...' })
        })
    })


    
    .get( (req, res) => {   // get all the records (accessed at GET http://localhost:5000/api/records)

        RecordTemplate.find( (err, allRecords) => {
            if (err) { res.send(err) }
            res.json(allRecords)
            console.log("All records send to Client: \n ")
        })
    })

            // ------------------------------------------------------------

router.route('/records/:_id')  
    
    .get( (req, res) => {  // http://localhost:5000/api/records/5aab446b0f66102c6131b83b
        RecordTemplate.findById(req.params._id, (err, oneRecord) => {
            if (err) { res.send(err) }
            console.log('Record Send to client: \n ', oneRecord)
            res.send( oneRecord )   
        })
    })



    .put( (req, res) => {   // update the legal record with given id (accessed at PUT http://localhost:8080/api/records/:_id)
        RecordTemplate.findById(req.params._id, (err, oneRecord) => {
            if (err) { res.send(err) }
            oneRecord.xml = req.body.xml;  // update the singer record
            oneRecord.save( (err) => {   // save the singer record
                if (err) { res.send(err) }
                res.json({ message: 'Legal Record updated!' })
                console.log('Record Updated...')
            })
        })
    })



    .delete( (req, res) => {  // delete a Legal record using id (accessed at DELETE http://localhost:8080/api/records/:_id)
        RecordTemplate.remove({
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
