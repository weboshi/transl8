import React, { Component } from 'react';
import { Bookmarks } from '../../Components/Bookmarks/bookmarks'

export class BookmarksPage extends Component {
    render(){
        return(
            <div className="bookmarks-container">
                <Bookmarks/>
            </div>
        )
    }
}