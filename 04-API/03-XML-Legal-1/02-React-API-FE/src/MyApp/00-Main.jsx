import React, { Component } from 'react'
import './styles/00-main.css'
// const MyURL = "http://demo9622188.mockable.io/test"
// let MyURL = "http://localhost/ajax/01-countries-data.php"
// let MyURL = "http://localhost:5000/users"
// let MyURL = "http://localhost:5000/api/singers/"
let MyURL = "http://localhost:5000/api/singers/5aab446b0f66102c6131b83b"

export default class extends Component {

    state = { scon: '' }

    render(){

        const GET1 = () => {
            console.log("GET: to Mock-API-1")

            const xhttp = new XMLHttpRequest()

            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    console.log('The response from the server: ')
                    // console.log('The server response: ', this.responseText)
                    console.log( this.response )
                }
            }

            xhttp.open("GET", MyURL, true)
            xhttp.send() 
        }


        const POST1 = () => {
            
        }



        return(
            <div>
                <h1>XML - TESTING - 3</h1>
                <hr/>

                <br/>
                <button onClick={GET1}>GET - XML API</button>
                <br/><br/>
                <hr/>

                <br/>
        

                <div className="secWrap">
                    <h4>GET ONE SINGER BY ID</h4>
                    <input type="text" value={this.state.findone} onChange={ (e) => { this.setState({ findone: e.target.value }) } }/>
                    <br/>
                    <button onClick={ GET1 }>GET ONE</button>
                    <br/><br/>
                </div>

                <br/>

                <div className="secWrap">
                    <h4>POST A NEW SINGER</h4>
                    <input type="text" value={this.state.name} onChange={ (e) => { this.setState({ name: e.target.value }) } }/>
                    <br/>
                    <button onClick={ GET1 }>POST</button>
                    <br/><br/>
                </div>

                <br/>

                <div className="secWrap">
                    <h4>UPDATE SINGER NAME</h4>
                    <input type="text" placeholder="ID of Singer to UPDATE" value={this.state.updateid} onChange={ (e) => { this.setState({ updateid: e.target.value }) } }/>
                    <br/>
                    <input type="text" placeholder="New Name" value={this.state.updatename} onChange={ (e) => { this.setState({ updatename: e.target.value }) } }/>
                    <br/>
                    <button onClick={ GET1 }>UPDATE</button>
                    <br/><br/>
                </div>

                <br/>

                <div className="secWrap">
                    <h4>DELETE SINGER BY ID</h4>
                    <input type="text" value={this.state.deleteid} onChange={ (e) => { this.setState({ deleteid: e.target.value }) } }/>
                    <br/>
                    <button onClick={ GET1 }>DELETE</button>
                    <br/><br/>
                </div>

                
            </div>
        )
    }
}


