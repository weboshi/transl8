import React, { Component } from 'react';
import { Jobs } from '../../Components/Jobs/jobs';
import './jobs-view.css';


export class JobsPage extends Component {
    render(){
        return(
            <div className='jobs-container'>
                <div className='jobs-form'>
                <Jobs/>
                </div>
            </div>
        )
    }
}
