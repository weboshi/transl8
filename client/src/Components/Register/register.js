import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import registrationApi from '../../Data/registration-api';
import axios from 'axios';
import Form from 'react-bootstrap/Form'

import { Button, ControlLabel, HelpBlock} from 'react-bootstrap'
import { UPDATE, INITIALIZE, UPDATEAMOUNT } from "../../Redux/actions/index";


import './register.css'


const mapDispatchToProps = dispatch => {
    return {
      UPDATE: newSettings => dispatch(UPDATE(newSettings)),
      INITIALIZE: (firstSettings) => dispatch(INITIALIZE(firstSettings)),
      UPDATEAMOUNT: newTotal => dispatch(UPDATEAMOUNT(newTotal))
    };
  };

  const mapStateToProps = (state) => {
    return { currencies: state.currencies, settings: state.settings};
  };


class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
                fields: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                },
                errors: {},
                successfulRegistration: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createUser = this.createUser.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    }


    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
                [event.target.name]: event.target.value
        })
    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
  
        if (!fields["username"]) {
          formIsValid = false;
          errors["username"] = "*Please enter your username.";
        }
  
        if (typeof fields["username"] !== "undefined") {
          if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors["username"] = "*Please enter alphabet characters only.";
          }
        }
  
        if (!fields["email"]) {
          formIsValid = false;
          errors["email"] = "*Please enter your email.";
        }
  
        if (typeof fields["email"] !== "undefined") {
          //regular expression for email validation
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email.";
          }
        }
  
        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "*Please enter your password.";
        }
  
        if (typeof fields["password"] !== "undefined") {
          if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            errors["password"] = "*Please enter secure and strong password.";
          }
        }

        if (fields["password"] !== fields["confirmPassword"]) {
            formIsValid = false;
            errors["confirmPassword"] = "*Passwords must match.";
        }
  
        this.setState({
          errors: errors
        });
        return formIsValid;
  
  
      }

      handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
  
      }
  
      submituserRegistrationForm(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.fields.username,
            email: this.state.fields.email,
            password: this.state.fields.password
        }

        if (this.validateForm()) {
            this.createUser(newUser)
            let fields = {};
            fields["username"] = "";
            fields["email"] = "";
            fields["password"] = "";
            fields["confirmPassword"] = "";
            this.setState({fields:fields});
            alert("Form submitted");
        }
  
      }

      handleChange2(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
  
      }



    createUser = (e) => {
        registrationApi.register(e)
    }

    handleSubmit(event) {
        event.preventDefault();

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            firstname: '',
            lastname: '',
    
        }
        console.log(newUser)
        console.log(this.state.validate)
        console.log('hmm')
        if (this.state.validate =='') {
            this.createUser(newUser)
            console.log('new user')
        }
        else { 
            this.setState({

            })
        }
    }

    render() {
        return (
            <div className="register-form">
                <h2>Register</h2>
                <Form onSubmit={this.handleSubmit}>
                <div className="errorMsg">{this.state.errors.username}</div>
                    <Form.Group
                    controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        value={this.state.fields.username}
                        placeholder="Enter username"
                        onChange={this.handleChange}
                    />
                    <Form.Control.Feedback />

                 
                    </Form.Group>
                    <div className="errorMsg">{this.state.errors.email}</div>
                    <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        type="text"
                        value={this.state.fields.email}
                        placeholder="Enter email"
                        onChange={this.handleChange}
                    />
                    <Form.Control.Feedback/>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Password</Form.Label>


                            <div className="errorMsg">{this.state.errors.password}</div>

                    <Form.Control

                        name="password"
                        type="password"
                        value={this.state.fields.password}
                        placeholder="Enter password"
                        onChange={this.handleChange}
                    />
                    <Form.Control.Feedback />
                
                    </Form.Group>

                     <Form.Group>
                     <Form.Label>Re-enter Password</Form.Label>

                    <div className="errorMsg">{this.state.errors.confirmPassword}</div>
                    <Form.Control

                        name="confirmPassword"
                        type="password"
                        value={this.state.fields.confirmPassword}
                        placeholder="Re-enter password"
                        onChange={this.handleChange}
                    />
                    <Form.Control.Feedback />
                
                    </Form.Group>
                    <Button style={{backgroundColor:'green', color:'white'}} onClick={this.submituserRegistrationForm}>Submit</Button>  <Button>Cancel</Button>
                    </Form>
            </div>
        );
    }
}

export const Registration = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

