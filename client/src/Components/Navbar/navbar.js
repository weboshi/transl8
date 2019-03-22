import React, { Component } from 'react';
import { Navbar, MenuItem, NavItem, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { LOGIN } from '../../Redux/actions/index'
import { connect } from 'react-redux';
import './navbar.css'

const mapStateToProps = (state) => {
    return { user: state.user};
  };

  const mapDispatchToProps = dispatch => {
    return {
      LOGIN: userInfo => dispatch(LOGIN(userInfo))
    };
  };


class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
        };
        this.logOut = this.logOut.bind(this)
    }

    componentWillMount(){
        console.log(this.props)

       if(localStorage.getItem('auth') === null){
            this.setState({
                loggedIn: false
            })
            console.log("Not Authenticated")
        }
        else {

            const userInfo = JSON.parse(localStorage.getItem('auth'))
            console.log(userInfo)
            this.props.LOGIN(userInfo)
            this.setState({
                loggedIn: true
            })
            console.log("Authenticated")
        }
    }

    logOut() {
        localStorage.removeItem('auth')
        window.location.reload(true);
    }

    render() {
        console.log(this.props)
        if (this.state.loggedIn === false) {
            return (
                <div className="navbar-container">
                <Navbar bg="dark" variant="dark" className="justify-content-around">
                    <Navbar.Brand href="/">
                        <i className="fas fa-comments"></i>
                        <span>Transl8</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-light">Search</Button>
                        </Form>
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/listings">Listings</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
    
                    </Navbar>
                </div>
        )
    }
    else {
        console.log(this.props)
        console.log(this.state)
        const email = this.props.user.email
        const username = this.props.user.username

        return(
            <div className="navbar-container">
            <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-around">
                <Navbar.Brand href="/">
                    <i className="fas fa-comments"></i>
                    <span>Transl8</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                    <Nav>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/listings">Listings</Nav.Link>
                        <Nav.Link href="/postlisting">Make Listing</Nav.Link>
                        <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/messages">Messages</NavDropdown.Item>
                            <NavDropdown.Item href="/userlistings">My Listings</NavDropdown.Item>
                            <NavDropdown.Item href="/bookmarks">Bookmarks</NavDropdown.Item>
                            <NavDropdown.Item onClick={this.logOut}>Logout</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/help">Help</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar>
            </div>
         )
    }
    }
}

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(NavigationBar);



