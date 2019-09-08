import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Button, Card, Container, Row} from 'react-bootstrap';
import QueryAction from './QueryAction'
const Todo = props => (
    <React.Fragment>

    <Card clasName='card'>
    <Link to={'/products/' + props.todo.id}><Card.Img variant="top" src={props.todo.image} /></Link>
    <Card.Body>
        <Card.Title>{props.todo.name}</Card.Title>
        <Card.Text>{props.todo.category}</Card.Text>
        <Card.Text>{props.todo.description.substr(0,50)+'...'}</Card.Text>
    </Card.Body>
    <Card.Body>
    <Link to={'/products/' + props.todo.id}><Button variant="primary"  size="sm">Description</Button></Link>
    </Card.Body>
    </Card>
    
    </React.Fragment>
)


export default class GetProducts extends Component {
    constructor(props){
        super(props)
        this.state = {
            item: [],
            query: {
                search : '%%',
                sortBy : 'name',
                sort: 'asc',
                limit: '5',
                page: '1'
            }
        }
    }

    componentDidMount() {
        const {search, sortBy, sort, limit, page} =this.state.query
        axios.get(`http://localhost:8080/products/?search=${search}&sortBy=${sortBy}&sort=${sort}&limit=${limit}&page=${page}`)
        .then(res =>{
            this.setState({item: res.data.data})
        })
       
    }

    queryString = (data) => {
        this.setState({query: data})
        const {search, sortBy, sort, limit, page} =this.state.query;
        axios.get(`http://localhost:8080/products/?search=${search}&sortBy=${sortBy}&sort=${sort}&limit=${limit}&page=${page}`)
        .then(res => this.setState({item: res.data.data, loading : true}))
        .catch(err => console.log(err))
    }

    todoList(){
        return this.state.item.map(function(currentTodo){
            return <Todo todo={currentTodo} key={currentTodo.id} />;
        })
    }

    render(){
        
        return(
            <>
            <Container>
            <QueryAction callBack={this.queryString} />
            </Container>
            
            <div>{this.todoList()}</div>
            </>
        )
    }
}