import React, { Component } from 'react';
import './welcomemessage.css'

export const WelcomeMessage = (props) => {
    return(
    <div className="welcome-message-container">
        <div className="welcomemessage">
        <div> Welcome to Transl8! </div>
        <div> A place to connect translators, translation jobs and everything language. </div>
        </div>
    </div>
    )
  }