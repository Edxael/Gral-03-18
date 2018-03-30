import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Banner1 from './img/tps1.png'
import './99-style.css'

import Home from './01-Home'
import About from './02-About'
import Pricing from './06-Picing'
import LogIn from './03-LogIn'
import CreateAcc from './04-CreateAcc'
import ResetPass from './07-Reset-Password'


export default class extends React.Component{
    render(){
        return(
            <div>
                <Router>
               
                    <div>
                        <img className="clear1" src={Banner1} alt="The Banner Store"/>
                        <br/><br/>

                        <div className="clear1">

                            <div>
                                <Link className="LinkStyle" to="/">Home</Link>
                                <Link className="LinkStyle" to="/1">About-Us</Link>
                                <Link className="LinkStyle" to="/2">Pricing</Link>
                                <Link className="LinkStyle" to="/3">Log-In</Link>
                            </div>
                            
                            <br/>
                            <hr/>

                            <Route exact path="/" component={Home}/>
                            <Route path="/1" component={About}/>
                            <Route path="/2" component={Pricing}/>
                            <Route path="/3" component={LogIn}/>
                            <Route path="/4" component={CreateAcc}/>
                            <Route path="/5" component={ResetPass}/>
                        </div>
                    </div>
                
                </Router>
            </div>
        )
    }
}

