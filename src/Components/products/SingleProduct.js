import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import Headers from '../page/Header';
import empty from '../../assets/Ellipsis-1s-100px.gif'
const token = localStorage.getItem('token');

class SingleProducts extends Component {
    state = {
        item: {},
        quantity: 0,
        deleted: false,
        isLoading: true
    }
    componentWillMount() {
        const {id} = this.props.match.params;
        axios.get(`/products/${id}`)
        .then(res =>
        {

        setTimeout(() => this.setState({item: res.data.data[0], isLoading: false}), 500);

        })
        .catch(err => console.log(err))
    }
    AddReduceQty = e => {
        const {id} = this.props.match.params
        e.preventDefault();
        const action = e.target.textContent.trim();
        axios.patch(`/products/${id}?act=${action}`, {headers: {authorization: token}})
        .then(res=>{
            if(action === 'add'){
                this.state.item.quantity += 1;
                this.setState({quantity: this.state.item.quantity})
                alert('add')
            }else{
                this.state.item.quantity -= 1;
                this.setState({quantity: this.state.item.quantity})
                alert('reduce')
            }
        })
        .catch(err => console.log(err))
    }
    DeleteProduct = e => {
        e.preventDefault();
        const {id} = this.props.match.params
        axios.delete(`http://localhost:8080/products/${id}`, {headers : {authorization : token }})
        .then(this.setState({deleted: true}))
        .catch(err => console.log(err))
        // this.setState({
        //     products: this.state.item.filter(items=> items.id !== id)
        // })
        alert('deleted')

    }
    render() {
        const {id_product, name, description, image, category, quantity} = this.state.item;
        const {deleted} =this.state
        if(deleted === true){
          return (<Redirect push to='/'/>)
        }

        return(
            <React.Fragment>
            <Headers />
              <Card style={{ width: '50%'}}>
              <Card.Body>
              {this.state.isLoading && <img src={empty}/>}
              <div className='col-9  p-0'>
              <Card.Img variant="top" src={image} onError={() => {this.state.item.image = 'https://icon-library.net/images/inventory-icon/inventory-icon-10.jpg'; this.forceUpdate()}}  className="img-fluid d-inline-block img-h" />
              </div>
              </Card.Body>

              </Card>

              <Card style={{ width: '50%'}}>

              <Card.Body>
              {this.state.isLoading && <img src={empty}/>}
              <Card.Title>{name}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                  <Card.Text>Quantity : {quantity}</Card.Text>
                  <Card.Text>{category}</Card.Text>
              </Card.Body>
              <Card.Body>
              <Link to={`/products/edit/` + id_product}><Button variant="primary">Edit</Button></Link>
              <Button variant="primary" onClick={this.AddReduceQty}>add</Button>
              <Button variant="warning" onClick={this.AddReduceQty}>reduce</Button>
              <Button variant="danger" onClick={this.DeleteProduct}>delete</Button>
              </Card.Body>
              </Card>
            </React.Fragment>
        )
    }
}
export default SingleProducts
