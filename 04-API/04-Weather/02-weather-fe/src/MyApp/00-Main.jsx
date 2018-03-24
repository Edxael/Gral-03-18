import React from 'react'
import axios from 'axios'

export default class extends React.Component{
    state = { zip: '', myapires: {}, show: false }

    render(){

        const Get1 = async () => {
            console.log('From the Async Fun...')

            let mytd = await axios.get('http://localhost:5000/api/zipcode/' + this.state.zip)
            this.setState({ myapires: await mytd.data })
            console.log('The Value is: ', this.state.myapires)
            this.setState({ zip: '', show: true })


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

                { this.state.show ? <WeatherInfo data={ this.state.myapires } /> : <div>Provide Zipcode to show weather data</div> }

            </div>
        )
    }
}


class WeatherInfo extends React.Component{
    render(){
        console.log("Data: ", this.props.data)
        const data = this.props.data
        return(
            <div>
                <h3>The Weather forecast for: { data.name } </h3>
               
                {/* <p><strong>Weather: </strong> { data }</p>
                <p><strong></strong> { data }</p> */}

            </div>
        )
    }
}