import React, { Component } from 'react'
import axios from 'axios';
import { UPDATEPROFILE } from '../../Redux/actions/index';
import { Panel, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import './mypins.css';

const mapDispatchToProps = dispatch => {
    return {
            UPDATEPROFILE: updatedInfo => dispatch(UPDATEPROFILE(updatedInfo))
    };
  };

  const mapStateToProps = (state) => {
    return { user: state.user};
  };


class myPinsComponent extends Component { 
    constructor(props){
        super(props);
        this.state = {
            editpin: false,
            thisPin: '',
        }
        this.mapUserPins = this.mapUserPins.bind(this)
        this.editPin = this.editPin.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
        this.updatePin = this.updatePin.bind(this)

    }

    componentDidMount() {
        console.log(this.props.user.username)
        axios({
            method: 'get',
            url: `/api/pin/getUserPins/${this.props.user.username}`,
        }).then(res => {
    
            console.log(res)
            
            this.setState({
                userPins: [res.data]
            })
        }).catch(
            err => console.log(err)
        )
    }

    updatePin() {
        console.log("hit")
        console.log(this.props.user.username)
        const updatedInfo = {
            description: this.state.description,
            category: this.state.category,
            title: this.state.title,
            id: this.state.id
        }
        console.log(updatedInfo)
        axios({
            method: 'put',
            url: '/api/pin/update',
            data: {
                description: this.state.description,
                category: this.state.category,
                title: this.state.title,
                username: this.props.user.username,
                id: this.state.id,
            },
        }).then(res => {
            console.log(res)
           
            if(res.status == 200){
                console.log("Pin Updated")
                window.location.reload(true)
            }
        }).catch(function(error){
                console.log(error) 
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

    mapUserPins() {
        console.log(this.state.userPins)
        const myPins = this.state.userPins[0]
        return(
                myPins.map((pin, i) => (
                    <div>  
                {this.state.editPin && this.state.thisPin === i ? 
                <Panel key={i} style={{backgroundColor:'rgb(35, 219, 133) !important'}}>
                    <Panel.Heading>
                        <div 
                        style={{
                            display:'flex', 
                            justifyContent:'space-between',
                            alignItems:'center'}}>
                    
                                <FormControl
                                type="text"
                                name="title"
                                value={this.state.title}
                                placeholder={pin.title}
                                onChange={this.handleChange}
                                /> 
                                <div style={{display: 'flex',justifyContent: 'space-between'}}>
                                    <Button style={{marginLeft:'20px',marginRight:'10px'}} onClick={this.cancelEdit}>Cancel</Button>
                                    <Button className='update-button' onClick={this.updatePin}>Update</Button>
                                </div>
                            </div>
                    </Panel.Heading>
                    <Panel.Body>Coordinates: {pin.coordinates}</Panel.Body>
                    <Panel.Body>      
                    <FormControl componentClass="select" placeholder={pin.category} name='category' onChange={this.handleChange}>
                        <option value="select">select</option>
                        <option value="Hiking">Hiking</option>
                        <option value="View">Nice View</option>
                        <option value="Chill">A Spot to Chill</option>
                        <option value="Make Your Own Adventure">Make Your Own Adventure</option>
                        <option value="Interesting">Interesting</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                </FormControl></Panel.Body>
                    <Panel.Body>      
                        <FormControl
                        name="description"
                        type="text"
                        value={this.state.description}
                        placeholder={pin.description}
                        onChange={this.handleChange}
                        />
                    </Panel.Body>
            </Panel>
            :
            <Panel key={i} bsStyle="primary">
            <Panel.Heading>
                <div
                style={{
                    display:'flex', 
                    justifyContent:'space-between',
                    alignItems:'center'}}>
                    <span style={{fontWeight:'bold'}}>Title: {pin.title}</span> <div><Button onClick={() => this.editPin(i, pin.id)}>Edit</Button></div></div>
            </Panel.Heading>
                <Panel.Body>Coordinates: {pin.coordinates}</Panel.Body>
                <Panel.Body>Category: {pin.category}</Panel.Body>
                <Panel.Body>Description: {pin.description}</Panel.Body>
        </Panel>
                }
                </div>
                ))
        )
    }

    editPin(clickedPin, pinId) {
        console.log(clickedPin)
        this.setState({
            editPin: !this.state.editPin, thisPin: clickedPin, id: pinId
        })
    }

    cancelEdit() {
        this.setState({
            editPin: !this.state.editPin, thisPin: '', id: ''
        })
    }

    render(){
        return(
            <div className='mypins-form'>
                <h3 className='pins-panel' style={{marginBottom:'20px'}}> User Pins</h3>
                <div style={{marginBottom:'30px'}}>Number of pins: {this.state.userPins && this.state.userPins[0].length}</div>
                {this.state.userPins && this.mapUserPins()}
                {!this.state.userPins && <div>Loading Pins</div>}
            </div>
        )
    }
}

export const MyPins =  connect(mapStateToProps, mapDispatchToProps)(myPinsComponent)