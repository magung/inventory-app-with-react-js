import React, {Component} from 'react';
import axios from 'axios';
import AuthService from '../users/AuthService';
import withAuth from '../users/WithAuth';
import { Navbar, Nav, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import SearchProducts from '../products/SearchProducts'
import GetProducts from '../products/GetProducts';


axios.defaults.baseURL = 'http://localhost:8080';
class Home extends Component {
  
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
                
                <SearchProducts />
                <Button variant="danger" type="submit" onClick={this._handleLogout}>
                  Logout
                </Button>
            </Navbar.Collapse>
          </Navbar>
          <div>
              <GetProducts />
          </div>
          <div>
            <Button className="btn btn-warning" onClick={()=>{this.page(-1)}}>{'<'}</Button>
            <Button className="btn btn-warning" onClick={()=>{this.page(1)}}>{'>'}</Button>
          </div>
      
        </div>
          
      );
    }
  }
   export default withAuth(Home);
