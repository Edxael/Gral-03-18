import React from 'react'
import axios from 'axios'

export default class extends React.Component{
    state = { zip: '', myapires: {} }

    render(){

        const Get1 = () => {
            console.log("Geting data:")
            console.log(this.state.zip)

            axios.get('http://localhost:5000/api/zipcode/' + this.state.zip)
                .then((response) => { this.setState({ myapires: response }) })

            setTimeout(() => {
                console.log('Data: ', this.state.myapires)
            }, 500)


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





//     used to get data straight from the weather api
// const Get1 = () => {
//     console.log('Get Data....')
//     let temp1 = ''
//     axios.get("http://api.openweathermap.org/data/2.5/weather?zip=84109,us&APPID=a90a1769668d41f38e80d8ee118e7760")
//         .then((data) => { temp1 = data.request  })
//         // .then((data) => { temp1 = JSON.parse( data.request.response ) })
        
//     setTimeout(() => {
//         console.log(typeof temp1)
//         console.log(" ")
//         console.log(temp1)
//     }, 500)
// }
