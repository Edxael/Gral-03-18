import React from 'react'
import SenData from './senators.json'

export default class Main extends React.Component{
    render(){

        console.log(SenData);
        

        const FilterRepublicans = () => {
            console.clear()
            let RepSen = SenData.filter( (politician) => { return politician.party === "Republican" } )
            console.log(RepSen)
        }


        const FilterDemocrats = () => {
            console.clear()
            let DemSen = SenData.filter( (politician) => { return politician.party === "Democrat" } )
            console.log(DemSen)
        }

        const FilterUtahSenators = () => {
            console.clear()
            let UtahSen = SenData.filter( (politician) => { return politician.state === "UT" } )
            console.log(UtahSen)
        }

        const FilterUtahSrSenator = () => {
            console.clear()
            let UtahSen = SenData.filter( (politician) => { return politician.state === "UT" && politician.senator_rank === "senior" } )
            console.log(UtahSen)
        }


      return(
          <div>
              <h1>Senators Homework.</h1>
              <hr/>

              <button onClick={ FilterRepublicans } >Republicans</button>
              <br/><br/>

              <button onClick={ FilterDemocrats } >Democrats</button>
              <br/><br/>

              <button onClick={ FilterUtahSenators } >Utah Senators</button>
              <br/><br/>

              <button onClick={ FilterUtahSrSenator } >Utah Sr Sen</button>
              <br/><br/>

          </div>
      )  
    }
}