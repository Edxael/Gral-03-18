
// --------------------------------------------------------------------------------------------------
    // The full functional front example:

    import React from 'react'
import axios from 'axios'
import './style.css'


export default class extends React.Component{
    state = { name: '', findone: '', updateid: '', updatename: '', deleteid: '' }

    render(){

        const getAll = () => {
            console.log("GET all the singers:")

            axios.get('http://localhost:5000/api/singers')
                .then( (response) => { return response.data } )
                .then( (data) => { console.log(data) })
                .catch( (error) => { console.log(error) })
        }




        const getOne = () => {
            console.log("GET one by ID:")

            axios.get( 'http://localhost:5000/api/singers/' + this.state.findone )
                .then( (response) => { return response.data } )
                .then( (data) => { console.log(data) })
                .catch( (error) => { console.log(error) })

                this.setState({ findone: '' })
        }




        const post1 = () => {
            console.log("POST a new singer:")

            axios.post('http://localhost:5000/api/singers', {
                name: this.state.name
            })
                .then( (response) => { console.log(response) })
                .catch( (error) => { console.log(error) })

                this.setState({ name: '' })
        }




        const update1 = () => {
            console.log("UPDATE Singer Record:")

            axios.put('http://localhost:5000/api/singers/' + this.state.updateid, {
                name: this.state.updatename
            })
                .then( (response) => { console.log(response) })
                .catch( (error) => { console.log(error) })

                this.setState({ updateid: '', updatename: '' })
        }





        const delete1 = () => {
            console.log("DELETE Singer Record:")

            axios.delete( 'http://localhost:5000/api/singers/' + this.state.deleteid )
                .then( (response) => { console.log(response) })
                .catch( (error) => { console.log(error) })

                this.setState({ deleteid: '' })
        }





        return(
            <div>
                <h1>Tesgin API - 1.1</h1>
                <hr/>


                <div className="secWrap">
                    <h4>GET ALL</h4>
                    <button onClick={ getAll }>GET All Data</button>
                    <br/><br/>
                </div>

                <br/>
        

                <div className="secWrap">
                    <h4>GET ONE SINGER BY ID</h4>
                    <input type="text" value={this.state.findone} onChange={ (e) => { this.setState({ findone: e.target.value }) } }/>
                    <br/>
                    <button onClick={ getOne }>GET ONE</button>
                    <br/><br/>
                </div>

                <br/>

                <div className="secWrap">
                    <h4>POST A NEW SINGER</h4>
                    <input type="text" value={this.state.name} onChange={ (e) => { this.setState({ name: e.target.value }) } }/>
                    <br/>
                    <button onClick={ post1 }>POST</button>
                    <br/><br/>
                </div>

                <br/>

                <div className="secWrap">
                    <h4>UPDATE SINGER NAME</h4>
                    <input type="text" placeholder="ID of Singer to UPDATE" value={this.state.updateid} onChange={ (e) => { this.setState({ updateid: e.target.value }) } }/>
                    <br/>
                    <input type="text" placeholder="New Name" value={this.state.updatename} onChange={ (e) => { this.setState({ updatename: e.target.value }) } }/>
                    <br/>
                    <button onClick={ update1 }>UPDATE</button>
                    <br/><br/>
                </div>

                <br/>

                <div className="secWrap">
                    <h4>DELETE SINGER BY ID</h4>
                    <input type="text" value={this.state.deleteid} onChange={ (e) => { this.setState({ deleteid: e.target.value }) } }/>
                    <br/>
                    <button onClick={ delete1 }>DELETE</button>
                    <br/><br/>
                </div>

            </div>
        )
    }
}


// -------------------------------------------------------------------------------------------------
// The full functional server: 07-N-API-XMLDocument



// BASE SETUP [ server.js ]
// =============================================================================

// call the packages we need
const express     = require('express');       // call express
const app         = express()                // define our app using express
const bodyParser  = require('body-parser')
const db          = require('mongoose')
const parseString = require('xml2js').parseString
const xml2js = require('xml2js')


const SingerTemplate   = require('./API-Files/singerSchema')



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('./API-Files/headers'))

// var port = process.env.PORT || 8080;        // set our port

// conection to DataBase
// db.connect('mongodb://master:Hkodoma48@ds125896.mlab.com:25896/courpath', (err) => {
db.connect('mongodb://admin1:Webaholics1@ds115569.mlab.com:15569/xml-1', (err) => {
    if(err){ console.log(err) }else { console.log("Conected to DataBase.") }
})






// ROUTES FOR OUR API
// =============================================================================
const router = express.Router()              // get an instance of the express Router

// middleware to use for all requests
router.use( (req, res, next) => {    // do logging
    console.log('Request to the server detected....')
    next(); // make sure we go to the next routes and don't stop here
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// app.use('/', (req, res) => {
//     // res.send('Hello Edmundo')
//     res.json({ message: 'Edmundo -2- welcome to our api!' })
// })


// on routes that end in /singesr
// ----------------------------------------------------

    
router.route('/singers')     // create a singer (accessed at POST http://localhost:5000/api/singers)

    .post( (req, res) => {
        const oneSinger = new SingerTemplate();      // create a new instance of the Singer model

        // You need to change the xml to json here... 

        oneSinger.name = req.body.name;  // set the singer name (comes from the request)
        oneSinger.save( (err) => {   // save the singer and check for errors
            if (err) { res.send(err) }
            res.json({ message: 'Singer Record Created...' })
        })
    })
    
    .get( (req, res) => {   // get all the singers (accessed at GET http://localhost:5000/api/singers)
        SingerTemplate.find( (err, allSingers) => {
            if (err) { res.send(err) }
            res.json(allSingers)
        })
    })


    let DataToUseInApp = ''

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

            console.log(temObj)
            let myBuilder = new xml2js.Builder()
            let myXML = myBuilder.buildObject(temObj)

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
            })
        })
    })



    .delete( (req, res) => {  // delete a singer record using id (accessed at DELETE http://localhost:8080/api/singers/:_id)
        SingerTemplate.remove({
            _id: req.params._id
        }, (err, xmldb) => {
            if (err) { res.send(err) }
            res.json({ message: 'Singer Record Successfully deleted' })
        })
    })




// REGISTER OUR ROUTES ---------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router)








// THE SERVER
// =============================================================================


// ********* SERVER LISTENER *********
app.listen(5000, (err) => {
    if(err){ throw err }
    console.log(" ")
    console.log("API Up-&-Running.....")
})
