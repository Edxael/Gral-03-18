import React from 'react'
import AllMoviesData from './98-data.json'

export default class extends React.Component{
    render(){
        // console.log(AllMoviesData)
        return(
            <div>
                <h1>This Week movies</h1>

                <div className="all-movies-cont">
                    { AllMoviesData.map((movie) => { return <Movie key={movie.name} info={movie} /> }) }
                </div>
            </div>
        )
    }
}


class Movie extends React.Component{
    render(){
        return(
            <div className="Movie-Profile">
                <div className="movie-pic-cont">
                    <img className="movie-pic" src={this.props.info.pic} alt="Product"/>
                </div>
                <div className="info-text-cont">
                    <div><strong>Name: </strong>{ this.props.info.name }</div>
                    <div><strong>Year: </strong>{ this.props.info.year }</div>
                    <div><strong>Desc: </strong>{ this.props.info.desc }</div>
                </div>
            </div>
        )
    }
}