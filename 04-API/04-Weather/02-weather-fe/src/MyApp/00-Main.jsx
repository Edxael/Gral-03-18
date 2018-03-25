import React from 'react'
import axios from 'axios'
import './style.css'

export default class extends React.Component{
    state = { zip: '', myapires: {}, show: false, err1: false }

    render(){

        const Get1 = async () => {
            console.log('From the Async Fun...')

            let mytd = await axios.get('http://localhost:5000/api/zipcode/' + this.state.zip)
                .catch((err) => { return err })

            console.log("The Result: ", mytd)


            if(mytd.status === 200){
                console.log("yes")

                this.setState({ myapires: await mytd.data, inputerror: false })
                console.log('The Value is: ', this.state.myapires)
                this.setState({ zip: '', show: true })
            }else{
                console.log("NOPE")
                this.setState({ inputerror: true, show: false })
            }
        }


        return(
            <div>
                <div className="dataCont">
                    <h1>Weather Info</h1>
                    <p>Provide zipcode then click "Get Data" button.</p>
                    <input className="zip-input" type="text" placeholder="ZIPCODE" value={this.state.zip} onChange={ (e) => { this.setState({ zip: e.target.value }) } } />
                    <br/><br/>

                    <button onClick={Get1} >Get Data</button>
                    <br/><br/>
                </div>
                <br/>

                <div className="dataCont">
                     <br/>
                    { this.state.show ? <WeatherInfo data={ this.state.myapires } /> : <div>Weather Data</div> }
                    <br/>
                    { this.state.inputerror ? <h2>Zipcode Error, please input correct zipcode</h2> : <div>*****</div> }

                    <div>If the page is not responding, refresh the page and input correct zipcode.</div>
                    <br/>
                </div>
                <br/>

                
                <div className="dataCont">
                    <br/>
                    <div>By: Edmundo Rubio</div>
                    <br/>
                </div>
                

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
                <h2>{ data.name }</h2>

                <div><strong>Description: </strong> { data.weather[0].description }</div>
                <div><strong>Temperature: </strong> { Math.round( data.main.temp * 9/5 - 459.67 ) } &deg;F.</div> 
                <div><strong>Humidity: </strong> {data.main.humidity } %</div>
                <div><strong>Wind Speed: </strong> { Math.round(data.wind.speed * 2.2369 * 100) / 100 } mph</div>
            </div>
        )
    }
}




// NOTE the Api data is:
// Temperature: Kelvin
// Wind-Spedd: Meters / second
// SunRise: unix time stamp  1521897748
// SunSet: unix time stamp  1521942304
