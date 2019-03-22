import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import registrationApi from '../../Data/registration-api';
import axios from 'axios';
import { UPDATE, INITIALIZE, UPDATEAMOUNT, LOGIN } from "../../Redux/actions/index";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './listing.css'


const mapDispatchToProps = dispatch => {
    return {
      UPDATE: newSettings => dispatch(UPDATE(newSettings)),
      INITIALIZE: firstSettings => dispatch(INITIALIZE(firstSettings)),
      UPDATEAMOUNT: newTotal => dispatch(UPDATEAMOUNT(newTotal)),
      LOGIN: userInfo => dispatch(LOGIN(userInfo))
    };
  };

const mapStateToProps = (state) => {
return { user: state.user, settings: state.settings};
};


class Listing extends Component {
    constructor(props) {
        super(props);

        this.state = {
          
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit() {
        axios({
            method: 'post',
            url: '/api/job/newJob/',
            data: {
                title: this.state.title,
                category: this.state.category,
                description: this.state.description,
                username: this.props.user.username,
                price: this.state.price,
                languageTo: this.state.languageTo,
                languageFrom: this.state.languageFrom
            }})
            .then(res => {
            console.log(res); if(res.code = 200) {
            console.log("Job successfully added")
            }
            else(
            console.log("Job not added")
            )
            }).catch(err => console.log(err))
            window.location.reload(true)
            }
    

    validateForm(){
        const user = this.state.username
        const password = this.state.password
        if( this.state.username.length > 0 && this.state.password.length > 0 ){
            return true
        }
        else if (this.state.username.length == 0 && this.state.password.length == 0){
            this.setState({
                formError: "Please enter a username and password."
            })
        }
        else if (this.state.username.length == 0 && this.state.password.length > 0){
            this.setState({
                formError: "Please enter a username."
            })
        } 
        else if (this.state.username.length > 0 && this.state.password.length == 0){
                this.setState({
                    formError: "Please enter a password."
                })
        }

    }
 

      handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        console.log(name)
        console.log(value)
        this.setState({
          [name]: value
        });
  
      }

  

    render() {
        return (
            <div className='form-container'>  
                <div className='form-component'>
                    <div className='create-label'>
                        <h1> Create Listing</h1>
                    </div>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={this.handleChange} name="title" type="email" placeholder="Looking for a translator to do subtitles from French to English..." />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>From</Form.Label>
                            <Form.Control onChange={this.handleChange} name="languageFrom" type="email" placeholder="The current language..." />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>To</Form.Label>
                            <Form.Control onChange={this.handleChange} name="languageTo" type="email" placeholder="The target language..." />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control onChange={this.handleChange} name="price" type="price" placeholder="Price..." />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Category</Form.Label>
                            <Form.Control onChange={this.handleChange} name="category" as="select">
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                            <option value="text">Text</option>
                            <option value="mixed">Mixed</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Job Description</Form.Label>
                            <Form.Control onChange={this.handleChange} name="description" as="textarea" rows="3" placeholder="Job details go here..."/>
                        </Form.Group>
                        <Button onClick={this.handleSubmit}>Submit New Listing</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export const ListingForm = connect(mapStateToProps, mapDispatchToProps)(Listing);