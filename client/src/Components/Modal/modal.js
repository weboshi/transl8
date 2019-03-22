import React, { Component } from 'react';
import { Button, Modal} from 'react-bootstrap'
import { Form } from '../Form/form';
import './modal.css'


export class ModalComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
        }
        this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    }
    handleShow() {
        console.log(this.state)
        this.setState({ show: true })
    }
    handleClose(){
        this.setState({ show: false })
    }

    render(){
        return(
            <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header style={{backgroundColor:'#337ab7'}} closeButton>
              <Modal.Title style={{color:'white'}}>Make a New Pin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form 
              onShow={this.props.onShow}
                  onClose={this.props.onClose} 
                  onSubmit={this.props.onSubmit} 
                  inputRef={this.props.inputRef}
                  descripref={this.props.descripref}
                  themeref={this.props.themeref}
                  onChange={this.props.onChange}  />
            </Modal.Body>
            <div className='modal-bottom'>
            <Button style={{margin:'10px', marginRight:0}} onClick={this.handleClose}>Cancel</Button><Button style={{margin:'10px'}} bsStyle="primary" onClick={this.props.onSubmit}>Submit</Button>
            </div>
          </Modal>
          </div>
        )
    }
  

}