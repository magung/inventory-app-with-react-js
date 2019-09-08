import React, { Component } from 'react';
import axios from 'axios';
import AddReduceDelete from './AddReduceDelete';
import Pagination from './Pagination';
import {Redirect} from 'react-router-dom';
import empty from '../../assets/Ellipsis-1s-100px.gif'

class Products extends Component {
	state = {
		items: [],
		totals: 0,
		query: {
			search: '%%',
			sortBy: 'name',
			sort: 'asc',
			limit: '6',
			page: '1'
		},

    isLoading: true

	}

	componentDidMount() {
		const { search, sortBy, sort, limit, page} = this.state.query;
		axios.get(`/products?search=${search}&sortBy=${sortBy}&sort=${sort}&limit=${limit}&page=${page}`)
		.then(res =>
		 {
			setTimeout(() => this.setState({items: res.data.data , totals: res.data.total.total, isLoading: false}), 500);
		 })
		.catch(err => console.log(err))
	}

	delete = (id) => {
		const token = localStorage.getItem('token');

		axios.delete(`/products/${id}`, {headers: {authorization: token}})
			.catch(err => this.setState({success: true}));

		this.setState({items: this.state.items.filter(item => item.id !== id)})
	}

	queryString = (data) => {
		this.setState({query: data})
		const {search, sortBy, sort, limit, page} = this.state.query;
		let url = `/products?search=${search}&sortBy=${sortBy}&sort=${sort}&limit=${limit}&page=${page}`;
		axios.get(url)
			.then(res => this.setState({items: res.data.data, isLoading: false}))
			.catch(err => console.log(err))
	}

	pageNumber = () => {
		var data = [];
		const counter =  Math.ceil(this.state.totals / this.state.query.limit);
		for (let i = 1; i <= counter; i++) {
			data.push(i);
		}
		return data
	}

	render() {
		const pageNum = this.pageNumber();
		return (
			<div id="products" className="row justify-content-md-center">
				<Pagination callBack={this.queryString} pagination={pageNum}/>
				<div id="title" className="container">
					<div className="row">
						<div className="col-5"></div>
						<div className="col-2">
						{this.state.isLoading && <img src={empty}/>}
						</div>
						</div>
				</div>
				{
					this.state.items.map( item => {
					return <AddReduceDelete item={item} key={item.id} delete={this.delete}/>
					})
				}

			</div>
		)
	}

}
export default Products;
