import React from 'react'
import axios from 'axios'

export default class extends React.Component{
    state = { zip: '', myapires: {} }

    render(){

        const Get1 = async () => {
            console.log('From the Async Fun...')

            let mytd = await axios.get('http://localhost:5000/api/zipcode/' + this.state.zip)
            this.setState({ myapires: await mytd })
            console.log('The Value is: ', this.state.myapires)
            this.setState({ zip: '' })
        }


        return(
            <div>
                <h1>Get Weather Info:</h1>
                <p>Put the zipcode to get weather information.2</p>
                <input type="text" placeholder=" ZIPCODE" value={this.state.zip} onChange={ (e) => { this.setState({ zip: e.target.value }) } } />
                <br/><br/>
                <button onClick={Get1} >Get Data</button>
                <br/>
                <hr/>
            </div>
        )
    }
}

