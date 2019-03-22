import React, { Component } from 'react';
import { ProfileForm } from '../../Components/Profile/profile';
import { Navigation } from '../../Components/Navbar/navbar';
import './profile-view.scss';

export class ProfilePage extends Component {
    render(){
        return(
            <div className='profile-container'>
                <div className='profile-form'>
                <ProfileForm/>
                </div>
            </div>
        )
    }
}
