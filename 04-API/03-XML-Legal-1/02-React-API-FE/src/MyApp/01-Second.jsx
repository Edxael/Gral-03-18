import React from 'react'
import axios from 'axios'
import './styles/00-main.css'

import LocalXML from './xml-data/answer.xml'
const parseString = require('xml2js').parseString;
const xml2js = require('xml2js')



export default class extends React.Component{
    state = { name: '', findone: '', updateid: '', updatename: '', deleteid: '', ob1: '' }

    render(){

    // --------------------------------------------------------------------------------
        const getLocalXML = () => {
            console.log("Get Localy Hosted XML.")

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

            axios.get('http://localhost:5000/api/records')
                .then( (response) => { return response.data } )
                .then( (data) => { console.log(data) })
                .catch( (error) => { console.log(error) })
        }

    // --------------------------------------------------------------------------------
        const getOne = () => {
            console.log("----------------------------------- \n  GET one by ID:")

            axios.get( 'http://localhost:5000/api/records/' + this.state.findone )
                .then( (response) => { return response.data } )
                .then( (data) => { console.log(" \n XML Response from the Server: \n  \n ", data) })
                .catch( (error) => { console.log(error) })

            this.setState({ findone: '' })
        }


    // --------------------------------------------------------------------------------
        const post1 = () => {
            console.log("----------------------------------- \n  POST a new Record: \n ")

            fetch(LocalXML)
                .then((res) => { return res.text() })
                .then((res) => { return parseString(res, (err, result) => { this.setState({ ob1: result }) }) })

                setTimeout(() => { 
                    console.log( this.state.ob1 )
        
                    let myBuilder = new xml2js.Builder()
                    let myXML = myBuilder.buildObject(this.state.ob1)
                    console.log("XML sended to the server:")
                    console.log(myXML)
                    console.log(typeof myXML)
        
                    axios.post('http://localhost:5000/api/records', { xml: myXML } )
                        .then( (response) => { console.log(" \n Response from the Server: ", response) })
                        .catch( (error) => { console.log(error) })
        
                    this.setState({ ob1: '' })
                 }, 500)

        }



    // --------------------------------------------------------------------------------
        const delete1 = () => {
            console.log("----------------------------------- \n  DELETE Record:")

            axios.delete( 'http://localhost:5000/api/records/' + this.state.deleteid )
                .then( (response) => { console.log(" \n Response from the Server: ", response) })
                .catch( (error) => { console.log(error) })

            this.setState({ deleteid: '' })
        }


    // --------------------------------------------------------------------------------


        return(
            <div>
                <h1>XML - Legal - API - 1.4</h1>
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
                    <h4>GET ONE RECORD BY ID</h4>
                    <input type="text" value={this.state.findone} onChange={ (e) => { this.setState({ findone: e.target.value }) } }/>
                    <br/>
                    <button onClick={ getOne }>GET ONE</button>
                    <br/><br/>
                </div>

                <br/>

                <div className="secWrap">
                    <h4>POST A NEW LEGAL RECORD</h4>
       
                    <button onClick={ post1 }>POST</button>
                    <br/><br/>
                </div>

                <br/>

                <div className="secWrap">
                    <h4>DELETE Record BY ID</h4>
                    <input type="text" value={this.state.deleteid} onChange={ (e) => { this.setState({ deleteid: e.target.value }) } }/>
                    <br/>
                    <button onClick={ delete1 }>DELETE</button>
                    <br/><br/>
                </div>

            </div>
        )
    }
}
