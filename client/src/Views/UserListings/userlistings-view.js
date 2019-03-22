import React, { Component } from 'react';
import { UserListings } from '../../Components/UserListings/userlistings'

export class UserListingsPage extends Component {
    render(){
        return(
            <div className="userlistings-container">
                <UserListings/>
            </div>
        )
    }
}