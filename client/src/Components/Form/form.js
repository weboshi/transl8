import React, { Component } from 'react';
import { FormControl, Button, ControlLabel, FormGroup} from 'react-bootstrap'


export const Form = props => {
        return(
            <div>
                <form onSubmit={props.onSubmit}>
            <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                    type="text"
                    value={props.value}
                    placeholder="Enter name for pin"
                    name='name'
                    inputRef={props.inputRef}
                 
                />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Category</ControlLabel>
                <FormControl componentClass="select" placeholder="select" name='theme' inputRef={props.themeref}>
                    <option value="select">select</option>
                    <option value="Hiking">Hiking</option>
                    <option value="View">Nice View</option>
                    <option value="Chill">A Spot to Chill</option>
                    <option value="MakeYourOwnAdventure">Make Your Own Adventure</option>
                    <option value="Interesting">Interesting</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Description</ControlLabel>
                <FormControl
                    type='text' 
                    name='description' 
                    componentClass="textarea" 
                    placeholder="Describe the pin..."
                    inputRef={props.descripref} />
                
            </FormGroup>
            </form>
        </div>
        )
    }
