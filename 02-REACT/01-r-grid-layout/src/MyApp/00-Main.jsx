import React from 'react'
import '../../node_modules/react-grid-layout/css/styles.css'
import '../../node_modules/react-resizable/css/styles.css'
var ReactGridLayout = require('react-grid-layout');

// Information:
// https://www.npmjs.com/package/react-grid-layout#usage
// https://react.rocks/example/react-grid-layout
// https://strml.github.io/react-grid-layout/examples/1-basic.html

// Examples:
// https://react.rocks/example/formbuilder
// https://react.rocks/example/react-trello-board


export default class extends React.Component{
    render(){

        let layout1 = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}
          ]
        
        const aStyle = { backgroundColor: "blue", border: "1px solid black", padding: "3px", marging: "2px" }
        const bStyle = { backgroundColor: "salmon", border: "1px solid black", padding: "3px", marging: "2px" }
        const cStyle = { backgroundColor: "aquamarine", border: "1px solid black", padding: "3px", marging: "2px" }

        return(
            <div>
                <h1>Hello from MAIN component - 2</h1>

                <ReactGridLayout className="layout" layout={layout1} cols={12} rowHeight={30} width={1200}>
                    <div style={aStyle} key="a">Camaro</div>
                    <div style={bStyle} key="b">Leones</div>
                    <div style={cStyle} key="c">Isla</div>
                </ReactGridLayout>
            </div>
        )
    }
}