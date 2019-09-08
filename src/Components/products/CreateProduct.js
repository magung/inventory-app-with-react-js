import React, { Component } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
class CreateProduct extends Component {

    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            categori : [],
            name : "",
            description : "",
            image: "",
            category: 1,
            quantity: 0,
            created: false
        }
    }
    onChangeName(e) {
        this.setState({
            name : e.target.value
        })   
    }
    onChangeDescription(e) {
        this.setState({
            description : e.target.value
        })   
    }
    onChangeImage(e) {
        this.setState({
            image : e.target.value
        })   
    }
    onChangeCategory(e) {
        this.setState({
            category : e.target.value
        })   
    }
    onChangeQuantity(e) {
        this.setState({
            quantity : e.target.value
        })   
    }
    onSubmit(e){
        e.preventDefault();
        console.log(`create`)
        console.log(`name : ${this.state.name}`)
        console.log(`description : ${this.state.description}`)
        console.log(`category : ${this.state.category}`)

        const newTodo = {
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            category: this.state.category,
            quantity: this.state.quantity,
        }
        const token = localStorage.getItem('token')
        
        axios.post('/products', newTodo, {headers: {authorization: token}})
        .then(this.postTimer.bind(this))
        .catch(err=>console.log(err))

        this.setState({
            name : "",
            description : "",
            image: "",
            category: 1,
            quantity: ""
        })
    }
    postTimer =() =>{
        setTimeout(() => this.setState({created: true}), 2000)
    }

    componentDidMount(){
        axios.get('/categories')
        .then(response => this.setState({categori: response.data.data }))
        
    }

    

    render(){
        const path = '/';
       const {created} = this.state
       if(created === true){
           return (<Redirect push to={path}/>)
       }
        return(
            <div style={{height : '800px' } } className='beckground'>
            <Container >
                <Row>
                    <Col style={{ backgroundColor: '#f5f8fa'}}>
                        <br/>
                    <Form onSubmit={this.onSubmit}>
                    <h1>Add Product</h1>
                    <Form.Group >
                        <Form.Label>Name Product</Form.Label>
                        <Form.Control name="name" value={this.state.name} placeholder="Enter name product" onChange={this.onChangeName} required/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" value={this.state.description} placeholder="Enter description product" onChange={this.onChangeDescription} required/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Image (Url)</Form.Label>
                        <Form.Control name="image" value={this.state.image} placeholder="Enter image product" onChange={this.onChangeImage} required/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" name="category" onChange={this.onChangeCategory} required>
                        <option selected>-- Select category --</option>
                        {this.state.categori.map(item => 
                        <option value={item.id}  key={item.id}>{item.category}</option>
                        )}
                        </Form.Control>
                        
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control name="quantity" value={this.state.quantity} placeholder="Enter quantity product" onChange={this.onChangeQuantity} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
                <br/>
                <Link to='/'>Back to home</Link>
                </Col>
                <Col ></Col>
                </Row>
            </Container>
            </div>
        )   
    }
}
export default CreateProduct