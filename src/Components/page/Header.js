import React, {Component} from 'react';
import { Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom';
import AuthService from '../users/AuthService';
export default class Headers extends Component{

    Auth = new AuthService();

  _handleLogout = () => {
  this.Auth.logout()
  this.props.history.replace('/login');
  }
    render(){
        return(
            <Navbar bg="primary" expand="lg">
                <Navbar.Brand href="/">Inventory App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                    <Nav.Link><Link to='/add'>Add Product</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar> 
        )
    }
}
