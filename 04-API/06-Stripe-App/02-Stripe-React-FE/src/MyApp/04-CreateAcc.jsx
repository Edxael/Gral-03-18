import React from 'react'

export default class extends React.Component{

    state = { name: '', email: '', password: '',  }

    render(){
        return(
            <div>
                <h1>Create Account</h1>

                <form action="">
                    <input className="LogInput" type="text" placeholder="Full Name..." value={this.state.email} onChange={ (e) => { this.setState({ name: e.target.value }) } } />
                    <input className="LogInput" type="text" placeholder="Email..." value={this.state.email} onChange={ (e) => { this.setState({ email: e.target.value }) } } />
                    <input className="LogInput" type="text" placeholder="Password..." value={this.state.password} onChange={ (e) => { this.setState({ password: e.target.value }) } } />

                    <input type="submit" value="Create Account"/>
                </form>

            </div>
        )
    }
}