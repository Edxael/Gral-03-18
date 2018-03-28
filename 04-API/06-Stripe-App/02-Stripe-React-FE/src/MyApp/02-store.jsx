import React from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'


export default class extends React.Component{
    state = { redirect: false, package: 0, pay: false }

    // onToken = (token) => {
    //     console.log("Token is: ", token)

    //     fetch('http://localhost:5000/charge', {
    //       method: 'POST',
    //       body: JSON.stringify(token),
    //         })
    //     // .then((response) => { response.json().then( (data) => {alert(`We are in business, ${data.email}`)  })  })
    //     .then((data) => { console.log("The data is: ", data ) })

    //   }


    onToken = (token) => {
        console.log("Token is: ", token)
        // let data2send = JSON.stringify(token)
        // console.log("Strinnify is: ", data2send)

        // axios.post('http://localhost:5000/charge/', { mydata: data2send } )
        axios.post('http://localhost:5000/charge/', { toke: token } )
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
                .catch( (error) => { console.log(error) })
    }

    


    render(){

        // const executePayment = () => {
        //     console.log("Executing Payment...")
        //     console.log("Package Value: ", this.state.package)
        //     console.log(" ")
        //     this.setState({ pay: true })
        // }

        // const stripePayment = () => {
        //     console.log(" \n Executing Payment.. \n ")
           
        //     return(
        //         <div>

        //             <h3>Payment...</h3>
                    

                    
        //         </div>
        //     )
        // }

        return(
            <div>
                <h1>Packages.</h1>

                <div className="table-cont">

                    <table border="3" className="table1">
                        <tbody>

                            <tr>
                                <th className="w-1"></th>
                                <th className="w-3" >Bronze</th>
                                <th className="w-3" >Silver</th>
                                <th className="w-3" >Gold</th>
                            </tr>
                            <tr>
                                <th className="w-1">Screens:</th>
                                <td className="w-3" >1</td>
                                <td className="w-3" >2</td>
                                <td className="w-3" >5</td>
                            </tr>
                            <tr>
                                <th className="w-1">Mobile:</th>
                                <td className="w-3" >0</td>
                                <td className="w-3" >1</td>
                                <td className="w-3" >5</td>
                            </tr>
                            <tr>
                                <th className="w-1">Mobile:</th>
                                <td className="w-3" >0</td>
                                <td className="w-3" >1</td>
                                <td className="w-3" >5</td>
                            </tr>
                            <tr>
                                <th className="w-1">Advertising:</th>
                                <td className="w-3" >Yes</td>
                                <td className="w-3" >Yes</td>
                                <td className="w-3" >No</td>
                            </tr>
                            <tr>
                                <th className="w-1">High Definition:</th>
                                <td className="w-3" >No</td>
                                <td className="w-3" >No</td>
                                <td className="w-3" >Yes</td>
                            </tr>

                            <tr>
                                <th className="w-1">Price:</th>
                                <td className="w-3" >$ 10</td>
                                <td className="w-3" >$ 20</td>
                                <td className="w-3" >$ 30</td>
                            </tr>

                            <tr>
                                <th className="w-1">Package:</th>
                                <td className="w-3" ><input className="radio1" type="radio" onClick={ () => { this.setState({ package: 1 }) } } name="PKG" value="Windows"/></td>
                                <td className="w-3" ><input className="radio1" type="radio" onClick={ () => { this.setState({ package: 2 }) } } name="PKG" value="Windows"/></td>
                                <td className="w-3" ><input className="radio1" type="radio" onClick={ () => { this.setState({ package: 3 }) } } name="PKG" value="Windows"/></td>
                            </tr>

                        </tbody>
                    </table>

                    <p>Select your monthly package, then click Payment</p>
                    <br/>

                    <StripeCheckout token={this.onToken} stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh" />

                    <br/>
                    
                    {/* { this.state.pay ? React.createElement(stripePayment) : <button onClick={ executePayment } >PAYMENT</button> } */}
                    {/* { this.state.redirect ? <Redirect push to="/3" /> : <div>...</div> } */}

                </div>
            </div>
        )
    }
}

