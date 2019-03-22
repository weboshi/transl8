import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import registrationApi from '../../Data/registration-api';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import { Button, HelpBlock} from 'react-bootstrap'
import { UPDATE, INITIALIZE, UPDATEAMOUNT, LOGIN } from "../../Redux/actions/index";
import './login.css'


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


class Login extends Component {
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
                formError: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
     
        this.setState({
          [name]: value
        });
  
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }
  
        handleSubmit(event) {
            event.preventDefault();
            if(this.validateForm()) {
                axios({
                    method: 'post',
                    url: '/api/user/logIn',
                    data: {
                        username: this.state.username,
                        password: this.state.password,
                    },
                }).then(res => {
                    console.log('beep')
                    const userInfo = res.data
                    console.log(userInfo)
                    if(res.data.code == 200){
                        this.props.LOGIN(userInfo)
                        localStorage.setItem('auth', JSON.stringify(res.data))
                        
                        console.log(this.props)
                        if (localStorage.getItem("auth") === null) {
                            console.log('yay')
                          }
                          else { 
                            const ba = JSON.parse(localStorage.getItem('auth'))
                            console.log(ba)}
                    }
                }).catch(error => {console.log(error)}
            )}
            else{
                this.setState({
                    formError: "Please enter a username and a password."
                })
            }
        }

    render() {
        return (
            <div className="login">
            <div className='login-header'>
                <h2>Log in</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                <div className="errorMsg">{this.state.formError}</div>
                {this.state.redirect && this.renderRedirect()}
                    <Form.Group
                   
                    >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
            
                        value={this.state.username}
                        placeholder="Enter username"
                        onChange={this.handleChange}
                    />
                    </Form.Group>
                    <Form.Group
                    controlId="password"
                    >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        value={this.state.password}
                        placeholder="Enter password"
                        onChange={this.handleChange}
                    />
                    <Form.Control.Feedback />
                    </Form.Group>
                        <Button style={{backgroundColor:'green', color:'white'}} onClick={this.handleSubmit}>Login</Button>  <Button>Cancel</Button>
                </form>
            </div>
        );
    }
}

export const LoginForm = connect(mapStateToProps, mapDispatchToProps)(Login);