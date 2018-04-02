import React from 'react'
import Menu2 from './Menus/Menu2'  // <Menu2/>
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import * as UCR from './97-LS'


export default class extends React.Component{

    state = { goDashboard: false, email: '', name: '' }

    componentWillMount(){
        console.clear()
        console.log("Hello from Component will mount...") 
        let userInfo = UCR.get('Ucre')
        console.log(userInfo)
        this.setState({ name: userInfo.name, email: userInfo.email })
    }

    render(){

        const ExecuteUpdates = () => {
            console.log("Executing Updates...")
            let userInfo = UCR.get('Ucre')
            // let oldEmail = userInfo.email

            userInfo.name = this.state.name
            // userInfo.email = this.state.email
            console.log("The Data is:", userInfo)

            axios.put('http://localhost:5000/customers/' + userInfo.email, userInfo )
                .then( (response) => { 
                    console.log(" \n Response from the Server: ",response) 

                    let userInfo = UCR.get('Ucre')
                    console.log(response.data.name)

                    userInfo.name = response.data.name

                    UCR.add('Ucre', userInfo)
                    this.setState({ goDashboard: true })

                })
                .catch( (error) => { console.log(error) })

        }

        return(
            <div>

                <Menu2/>

                <h1>Update Account..</h1>
                <div>
                    <input type="text" value={this.state.name} onChange={ (e) => { this.setState({ name: e.target.value }) } } /><br/>
                    {/* <input type="text" value={this.state.email} onChange={ (e) => { this.setState({ email: e.target.value }) } } /> */}
                </div>

                { this.state.goDashboard ? <Redirect push to="/6" /> : <div>...</div> }

                <button onClick={ ExecuteUpdates }> Save Changes</button>
                
            </div>
        )
    }
}