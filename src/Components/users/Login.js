import React, { Component } from "react";
import AuthService from './AuthService';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


class Login extends Component {
  Auth = new AuthService();

  state = {
    email: "",
    password: ""
  }

  _handleChange = (e) => {
    this.setState(
        {
            [e.target.name]: e.target.value
        }
    )
  }

  handleFormSubmit = e => {
    e.preventDefault();

    /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace("/");
      })
      .catch(err => {
        alert(err);
      });


  };

  componentDidMount() {
    /* Here is a great place to redirect someone who is already logged in to the protected route */
    if (this.Auth.loggedIn())
        this.props.history.replace('/');
  }

  render() {
      return (
          <React.Fragment>
            <div className='container background' style={{height : '800px'}}>
              <div className='row' style={{margin : '50px'}}>
                <div className='col-6'></div>
                <div className='col-6' style={{backgroundColor  : 'hsla(218, 100%, 50%, 0.3)'}}>
                  <div style={{textAlign : 'center'}}>                  
                    <span>
                      Inventory App
                    </span><br />
                    <span>
                      Account Login
                    </span>
                  </div>

                  <Form>
                    <Form.Group>
                      <Form.Text>
                        Email : 
                      </Form.Text>
                      <Form.Control type="email" name="email" placeholder="Enter email" onChange={this._handleChange} />
                      
                    </Form.Group>
                    <Form.Group>
                      <Form.Text>
                        Password : 
                      </Form.Text>
                      <Form.Control type="password" name="password" placeholder="Enter password" onChange={this._handleChange} />
                    </Form.Group>
                    <Button variant='primary' type='submit' onClick={this.handleFormSubmit}>
                      Login
                    </Button>
                    <div>
                      <Link className="center" to="/register">Dont have an account? <span>Signup</span></Link>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </React.Fragment>
      );
  }


}


export default Login;
