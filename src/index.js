import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CreateProduct from './Components/products/CreateProduct';
import SingleProducts from './Components/products/SingleProduct';
import EditProduct from './Components/products/EditProduct';
import Login from './Components/users/Login';
import Signup from './Components/users/Signup';
import GetSearching from './Components/products/GetSearching';

ReactDOM.render(
    <Router>
    <Switch>
    <Route exact path="/login" render= {(props)=>{ return <Login {...props}/>}} />
    <Route exact path="/register" render= {(props)=>{ return <Signup {...props}/>}} />
    <Route exact path='/' render= {(props)=>{ return <App {...props}/>}}/>
    <Route exact path="/add" component= {(props)=>{ return <CreateProduct {...props}/>}} />
    <Route exact path="/products/:id" component= {(props)=>{ return <SingleProducts {...props}/>}} />
    <Route exact path="/products/edit/:id" component= {(props)=>{ return <EditProduct {...props}/>}} />
    <Route exact path="/getsearching/:name" component= {(props)=>{ return <GetSearching {...props}/>}}/>
  
    </Switch>
    </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
