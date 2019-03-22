import React, { Component } from 'react';
import { Registration } from '../../Components/Register/register';
import { Navigation } from '../../Components/Navbar/navbar';
import './registration-view.scss';

export class RegistrationPage extends Component {
    render(){
        return(
            <div className='registration-container'>
                <div className='registration-form'>
                <Registration/>
                </div>
            </div>
        )
    }
}
