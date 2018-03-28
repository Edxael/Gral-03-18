import React from 'react'
import Collage from './img/collage.png'

export default class extends React.Component{
    render(){
        return(
            <div>
                <h1>About Stream - Flix</h1>

                <img className="about-img" src={Collage} alt="pic"/>

                <h3>For question plese contac us:</h3>
                <div><strong>Phone: </strong>101-123.4567</div>
                <div><strong>Email: </strong>info@stfx.com</div>

            </div>
        )
    }
}