import React, { Component} from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

function refreshPage() {
    window.location.reload(false);
  }
class EditProduct extends Component {
    state = {
        categories : [],
        category: 1,
        edited : false
    }


    componentDidMount(){
        const {id} = this.props.match.params;

        axios.get(`http://localhost:8080/products/${id}`)
        .then(res => {
            for (var key in res.data.data[0]){
                this.setState({[key] : res.data.data[0][key]})
            }
        })
        .catch(err => console.log(err))

        axios.get('http://localhost:8080/categories')
        .then(response => this.setState({categories: response.data.data }))
    }

    editData = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    editSelect = e => {
        this.setState({category : e.target.value})
    }

    editSubmit = () => {
        const {id} = this.props.match.params;
        const token = localStorage.getItem('token');
        console.log(`category : ${this.state.category}`)

        const {name, image, category, quantity, description} = this.state;

        axios.put(`/products/` + id, {name, image, category, quantity, description}, {headers: {authorization : token}})
        .then(this.setState({edited: true}))

    }


    render() {
        const {name, image, quantity, description, edited} = this.state;
        const path = '/products/' + this.props.match.params.id;
        if(edited === true){
            return setTimeout(() => this.props.history.replace(path), 250)
        }
        return(
          <div style={{height : '800px' } } className='beckground'>
          <Container >
              <Row>
              <Col ></Col>
              <Col style={{ backgroundColor: '#f5f8fa'}}>
                  <br/><h1>Edit Product</h1>
             <Form>
                <Form.Group >
                    <Form.Label>Name Product</Form.Label>
                    <Form.Control name="name" placeholder="Enter name product" onChange={this.editData} value={name} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" placeholder="Enter description product" onChange={this.editData} value={description}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Image (Url)</Form.Label>
                    <Form.Control name="image" placeholder="Enter image product" onChange={this.editData} value={image} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Category</Form.Label>
                    <Form.Label >Select category product</Form.Label>
                    <Form.Control as="select"  onChange={this.editSelect}>
                    <option selected>-- Select category --</option>
                    {this.state.categories.map(item =>{
                       return <option value={item.id}   key={item.id}>{item.category}</option>
                        })
                    }
                    </Form.Control>

                </Form.Group>
                <Form.Group >
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control name="quantity" placeholder="Enter quantity product" onChange={this.editData} value={quantity} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.editSubmit}>
                    Submit
                </Button>
            </Form></Col>
                </Row>
            </Container>
            </div>
        )
    }
}
export default EditProduct;
