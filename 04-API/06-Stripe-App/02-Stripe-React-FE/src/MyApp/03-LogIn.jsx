import React from 'react'
import './99-style.css'
import { Redirect } from 'react-router-dom'

export default class extends React.Component{
    state = { email: '', password: '', createacc: false, ressetpassword: false }
    render(){
        return(
            <div>
                <h1>Log-In</h1>

                <div>
                    <input className="LogInput" type="text" placeholder="Email..." value={this.state.email} onChange={ (e) => { this.setState({ email: e.target.value }) } } />
                    <input className="LogInput" type="text" placeholder="Password..." value={this.state.password} onChange={ (e) => { this.setState({ password: e.target.value }) } } />
                    <input type="submit" value="Log-In"/>
                    <br/><br/>

                    { this.state.ressetpassword ? <Redirect push to="/5" /> : <a href="" onClick={ () => { this.setState({ ressetpassword: true }) } } >Forgot Password?</a> }
                </div>

                <hr className="line50" />

                
                { this.state.createacc ? <Redirect push to="/4" /> : <a href="" onClick={ () => { this.setState({ createacc: true }) } } >Create Account</a> }

            </div>
        )
    }
}



// { this.state.redirect ? <Redirect push to="/3" /> : <button onClick={ () => { this.setState({ redirect: true })  } } >Log-In to My Account</button>}

// onClick={ () => { this.setState({ createacc: true }) } }

