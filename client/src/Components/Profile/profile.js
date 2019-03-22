import React, { Component } from 'react';
import { FormControl, Button, ControlLabel, FormGroup, Col, Image, Grid} from 'react-bootstrap';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { UPDATEPROFILE } from '../../Redux/actions/index'
import registrationApi from '../../Data/registration-api';
import './profile.css'

const mapDispatchToProps = dispatch => {
    return {
            UPDATEPROFILE: updatedInfo => dispatch(UPDATEPROFILE(updatedInfo))
    };
  };

  const mapStateToProps = (state) => {
    return { currencies: state.currencies, user: state.user};
  };


class ProfileComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit: false,
        }
        this.editDescription = this.editDescription.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
        this.submitEdit = this.submitEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.onImageDrop = this.onImageDrop.bind(this)
    }

    componentDidMount(){
        console.log(this.props.user.username)
        this.setState({
            username: this.props.user.username,
            email: this.props.user.email,
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            description: this.props.user.description
        }, () => console.log(this.state.email))
        
    }

    onImageDrop(files) {
        this.setState({
          uploadedFile: files[0]
        });
    
        this.handleImageUpload(files[0]);
      }

    editDescription(){
        this.setState({
            edit: true,
        })
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
     
        this.setState({
          [name]: value
        }, () => { console.log(this.state)});
        console.log(this.state)
        console.log(this.props.user.username)
      }

      updateProfile = (updatedInfo) => {
      const profile = {
        ...JSON.parse(localStorage.getItem('auth')),
        ...updatedInfo
        };
        localStorage.setItem('auth', JSON.stringify(profile));
        }

    submitEdit() {
        console.log("hit")
        console.log(this.props.user.username)
        const updatedInfo = {
            description: this.state.description,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }
        console.log(updatedInfo)
        axios({
            method: 'put',
            url: '/api/user/update',
            data: {
                description: this.state.description,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.props.user.username
            },
        }).then(res => {
            console.log(res)
           
            if(res.status == 200){
                this.props.UPDATEPROFILE(updatedInfo)
                    this.updateProfile(updatedInfo)
                console.log(JSON.parse(localStorage.getItem('auth')))
                console.log("Profile Updated")
                window.location.reload(true)
            
                
              
            }
        }).catch(function(error){
                console.log(error) 
            })

    }

    cancelEdit() {
        this.setState({
            edit: false,
        })
    }

    render(){
        return(
            <div className='profile'>
                {!this.state.edit ? 
                <div className='normal-profile'>
                    <h3 className='profile-label'>{this.props.user.username}'s Profile</h3>
                    <form>
                        <div className='form-label'><div className='form-span'>Username:</div><div className='form-content'>{this.props.user.username}</div></div>
                        <div className='form-label'><div className='form-span'>Email:</div><div className='form-content'>{this.props.user.email}</div></div>
                        <div className='form-label'><div className='form-span'>First Name:</div><div className='form-content'>{this.props.user.firstname}</div></div>
                        <div className='form-label'><div className='form-span'>Last Name:</div><div className='form-content'>{this.props.user.lastname}</div></div>
                        <div className='form-label'><div className='form-span'>Description:</div><div className='form-content'>{this.props.user.description}</div></div>
                    </form>
                    <div className="edit-panel">
                        <Button onClick={this.editDescription}>Edit</Button> 
                    </div>
                </div>
        :
         <div className='edit-profile'>
                <h3 className="profile-label">{this.props.user.username}'s Profile</h3>
             <form>

            <div className='form-label'><div className='form-span'>Username:</div><div className='form-content'>{this.props.user.username}</div></div>
            <div className='form-label'><div className='form-span'>Email:</div><div className='form-content'>{this.props.user.email}</div></div>
            <div className='form-label'>
                <div className='form-span'>First Name:</div>
                    <div className='form-content'> 
                    <FormControl
                        name='firstname'
                        type="text"
                        value={this.state.firstname}
                        placeholder="First Name"
                        onChange={this.handleChange}
                    />
                </div>
            </div>

            <div className='form-label'><div className='form-span'>Last Name:</div><div className='form-content'>         <FormControl
                name='lastname'
                type="text"
                value={this.state.lastname}
                placeholder="Last Name"
                onChange={this.handleChange}

            /></div></div>

            <div className='form-label'><div className='form-span' style={{verticalAlign:'top'}}>Description:</div><div className='form-content'>            <FormControl
                name='description'
                type="text"
                value={this.state.description}
                placeholder="Tell us about yourself..."
                onChange={this.handleChange}
                componentClass="textarea"
            /></div></div>

        </form>

         <div className='edit-panel'>
         <Button onClick={this.cancelEdit}>Cancel</Button> <Button onClick={this.submitEdit}>Save Changes</Button>
         </div>
         </div>}
        
        </div>
    
        )
    }
}

export const ProfileForm =  connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)