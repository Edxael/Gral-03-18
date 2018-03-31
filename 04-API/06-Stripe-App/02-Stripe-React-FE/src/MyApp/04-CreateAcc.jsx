import React from 'react'
import axios from 'axios'


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default class extends React.Component{

    state = { name: '', email: '', password: '',  }

    render(){

        const CreateUser = (event) => {
            event.preventDefault()

            let userObj = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }

            axios.post('http://localhost:5000/customers', { xinfo: userObj } )
                .then( (response) => { console.log(" \n Response from the Server: ", response) })
                .catch( (error) => { console.log("Error from Server: ", error) })

            this.setState({ name: '', email: '', password: '' })
        }



        return(
            <div>
                <h1>Create Account.</h1>

                <form action="" onSubmit={CreateUser} >
                    <input className="LogInput" type="text" placeholder="Full Name..." value={this.state.name} onChange={ (e) => { this.setState({ name: e.target.value }) } } />
                    <input className="LogInput" type="email" placeholder="Email..." value={this.state.email} onChange={ (e) => { this.setState({ email: e.target.value }) } } />
                    <input className="LogInput" type="password" placeholder="Password..." value={this.state.password} onChange={ (e) => { this.setState({ password: e.target.value }) } } />

                    <input type="submit" value="Create Account"/>
                </form>

            </div>
        )
    }
}



