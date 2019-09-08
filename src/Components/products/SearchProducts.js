import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import { Form, FormControl, Button } from 'react-bootstrap';
export default class SearchProducts extends Component {
    constructor(props){
		super(props)
		this.state = {
			todoItem: '',
			items: []
		}
    }
    
   

	handleSubmit = (event) => {
		event.preventDefault()
		this.setState({
			items    : [...this.state.items, this.state.todoItem],
			todoItem : ''
		})
		
	}

	handleChange = (event) => {
		this.setState({
			todoItem: event.target.value
		})
		
    }
    
    render(){
        
        return( 
		
			<Form inline onSubmit={this.handleSubmit}>
			<FormControl type="text" placeholder="Searching by name product" className="mr-sm-2" value={this.state.todoItem} onChange	={this.handleChange} required/>
			<Link to={'/getsearching/' + this.state.todoItem}><Button variant="primary" type="submit" ><i class="material-icons">youtube_searched_for</i></Button></Link>
			</Form>
			
        )
    }

}
