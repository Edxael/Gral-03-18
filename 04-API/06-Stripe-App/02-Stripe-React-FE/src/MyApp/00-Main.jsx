import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Banner1 from './img/tps1.png'
import './99-style.css'

import Home from './01-Home'
import Store from './02-store'
import About from './03-About'
import Payment from './PaymentForms/01-Payment-Cont'


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
                                <Link className="LinkStyle" to="/1">Packages</Link>
                                <Link className="LinkStyle" to="/2">About</Link>
                            </div>
                            
                            <br/>
                            <hr/>

                            <Route exact path="/" component={Home}/>
                            <Route path="/1" component={Store}/>
                            <Route path="/2" component={About}/>
                            <Route path="/3" component={Payment}/>

                        </div>
                    </div>
                
                </Router>
            </div>
        )
    }
}

