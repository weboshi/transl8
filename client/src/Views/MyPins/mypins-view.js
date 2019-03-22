import React, { Component } from 'react';
import { MyPins } from '../../Components/MyPins/mypins'

export class MyPinsPage extends Component {
    render(){
        return(
            <div className="mypins-container">
            <MyPins/>
            </div>
        )
    }
}