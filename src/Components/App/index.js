import React, {Component} from 'react';
import axios from 'axios';
import AuthService from '../users/AuthService';
import withAuth from '../users/WithAuth';
import { Navbar, Nav, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
// import SearchProducts from '../products/SearchProducts'
// import GetProducts from '../products/GetProducts';
import Products from '../products/NewProducts';

axios.defaults.baseURL = 'http://localhost:8080';
class App extends Component {

  Auth = new AuthService();

  _handleLogout = () => {
  this.Auth.logout()
  this.props.history.replace('/login');
  }

     render() {


      return (
        <div>
          <Navbar bg="primary" expand="lg">
            <Navbar.Brand href="/">Inventory App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link><Link to='/'>Home</Link></Nav.Link>
                <Nav.Link><Link to='/add'>Add Product</Link></Nav.Link>
                </Nav>
                <Button variant="danger" type="submit" onClick={this._handleLogout}>
                  Logout
                </Button>
            </Navbar.Collapse>
          </Navbar>
          <br/>
          <div>
             <Products />
          </div>


        </div>

      );
    }
  }
   export default withAuth(App);
