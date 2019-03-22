import React, { Component } from 'react';
import { Searchbar } from '../../Components/Search/search';
import './welcome-view.scss';

export class WelcomePage extends Component {
    render(){
        return(
            <div className='welcome-container'>
                <div className='welcome-form'>
                    <div className='welcome-message'>Welcome to <div style={{fontWeight:'bolder',color:' rgba(2, 199, 140, 0.753)', display:'inline-block'}}>MapBoard!</div></div>
                    <Searchbar/>
                </div>
            </div>
        )
    }
}
