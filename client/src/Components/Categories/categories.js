import React, { Component } from 'react';
import './categories.css'

export const Categories = (props) => {
    return(
    <div className="categories-container">
        <div className="categories">
        <div className="categories-label"> Categories </div>
            <li><a href="/listings/video">Video</a></li>
            <li><a href="/listings/audio">Audio</a></li>
            <li><a href="/listings/text">Text</a></li>
            <li><a href="/listings/mixed">Mixed</a></li>
            <li><a href="/listings">All</a></li>
        </div>
        <div className="categories">
        <div className="categories-label"> Find a Translator </div>
            <li><a href="/listings/video">English</a></li>
            <li><a href="/listings/audio">Spanish</a></li>
            <li><a href="/listings/text">Korean</a></li>
            <li><a href="/listings/mixed">Japanese</a></li>
            <li><a href="/listings">All</a></li>
        </div>
        <div className="categories">
        <div className="categories-label"> Find a Tutor </div>
            <li><a href="/listings/video">English</a></li>
            <li><a href="/listings/audio">Spanish</a></li>
            <li><a href="/listings/text">Korean</a></li>
            <li><a href="/listings/mixed">Japanese</a></li>
            <li><a href="/listings">All</a></li>
        </div>
        
    </div>
    )
  }