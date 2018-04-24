import React from 'react'
// import { Redirect } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'


export default class extends React.Component{
    state = { redirect: false, package: 0, pay: false }

    onToken = (token) => {
        console.log("Token is: ", token)

        fetch('/save-stripe-token', {
          method: 'POST',
          body: JSON.stringify(token),
            })
        .then((response) => { response.json().then( (data) => {alert(`We are in business, ${data.email}`)  })  })

      }

    render(){


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
                    
     

                </div>
            </div>
        )
    }
}

