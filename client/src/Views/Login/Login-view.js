import React, { Component } from 'react';
import { LoginForm } from '../../Components/Login/login';
import './login-view.css';
import { Navigation } from '../../Components/Navbar/navbar';

export class LoginPage extends Component {
    render(){
        return(
            <div className='login-container'>

                <div className='login-form'>
                <LoginForm/>
                </div>
            </div>
        )
    }
}
