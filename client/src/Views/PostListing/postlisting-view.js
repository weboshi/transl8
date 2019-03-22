import React, { Component } from 'react';
import { ListingForm } from '../../Components/Listing/listing'

export class PostListingPage extends Component {
    render(){
        return(
            <div className="postlisting-container">
                <ListingForm/>
            </div>
        )
    }
}