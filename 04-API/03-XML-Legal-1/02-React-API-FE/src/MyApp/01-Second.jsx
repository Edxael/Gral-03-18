import React from 'react'
import axios from 'axios'
// import xml2js from 'xml2js'
import './styles/00-main.css'

import LocalXML from './xml-data/answer.xml'
const parseString = require('xml2js').parseString;
const xml2js = require('xml2js')



export default class extends React.Component{
    state = { name: '', findone: '', updateid: '', updatename: '', deleteid: '', ob1: '' }

    render(){

    // --------------------------------------------------------------------------------
        const getLocalXML = () => {
            console.log("Get Localy Hosted XML")

            // code: https://github.com/Edxael/Gral-02-18/blob/master/02-React/19-longxml/src/MyApp/00-Main.jsx

            fetch(LocalXML)
                .then((res) => { return res.text() })
                .then((res) => { return parseString(res, (err, result) => { this.setState({ ob1: result }) }) })

            setTimeout(() => { 
                console.log( this.state.ob1 )
                this.setState({ ob1: '' })
             }, 500)
        }

    // --------------------------------------------------------------------------------
        const getAll = () => {
            console.log("----------------------------------- \n  GET all the Records:")

            axios.get('http://localhost:5000/api/singers')
                .then( (response) => { return response.data } )
                .then( (data) => { console.log(data) })
                .catch( (error) => { console.log(error) })
        }

    // --------------------------------------------------------------------------------
        const getOne = () => {
            console.log("----------------------------------- \n  GET one by ID:")

            axios.get( 'http://localhost:5000/api/singers/' + this.state.findone )
                .then( (response) => { return response.data } )
                .then( (data) => { console.log(" \n XML Response from the Server: \n  \n ", data) })
                .catch( (error) => { console.log(error) })

            this.setState({ findone: '' })
        }


    // --------------------------------------------------------------------------------
        const post1 = () => {
            console.log("----------------------------------- \n  POST a new Record: \n ")

            let tempObj = {
                SingerProfile: {
                    name: this.state.name
                }
            }

            let myBuilder = new xml2js.Builder()
            let myXML = myBuilder.buildObject(tempObj)
            console.log("XML sended to the server:")
            console.log(myXML)
            console.log(typeof myXML)

            axios.post('http://localhost:5000/api/singers', { xml: myXML } )
                .then( (response) => { console.log(" \n Response from the Server: ", response) })
                .catch( (error) => { console.log(error) })

            this.setState({ name: '' })
        }


    // --------------------------------------------------------------------------------
        const update1 = () => {
            console.log("----------------------------------- \n  UPDATE Singer Record:")

            axios.put('http://localhost:5000/api/singers/' + this.state.updateid, {
                name: this.state.updatename
            })
                .then( (response) => { console.log(" \n Response from the Server: ",response) })
                .catch( (error) => { console.log(error) })

            this.setState({ updateid: '', updatename: '' })
        }


    // --------------------------------------------------------------------------------
        const delete1 = () => {
            console.log("----------------------------------- \n  DELETE Record:")

            axios.delete( 'http://localhost:5000/api/singers/' + this.state.deleteid )
                .then( (response) => { console.log(" \n Response from the Server: ", response) })
                .catch( (error) => { console.log(error) })

            this.setState({ deleteid: '' })
        }


    // --------------------------------------------------------------------------------


        return(
            <div>
                <h1>XML - Long - API - 1.4</h1>
                <hr/>


                <div className="secWrap">
                    <h4>GET LOCAL XML</h4>
                    <button onClick={ getLocalXML }>GET Local XML</button>
                    <br/><br/>
                </div>

                <br/>


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

