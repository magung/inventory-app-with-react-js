import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Pagination extends Component {
	state = {
		search: '',
		sortBy: 'name',
		sort: 'asc',
		limit: '6',
		page: '1',
	}

	handlerChange = (e) => {
		this.setState({ [e.target.name]: e.target.value});
		console.log(e.target.value);
		setTimeout(() => this.props.callBack(this.state), 250);
	}
	render() {
		return (
			<div id="title" className="container">

				<div className="row">

					<div className="col-2">
							<select defaultValue="Sort By" className="form-control" name="sortBy" onChange={this.handlerChange}>
						      <option disabled>Sort By</option>
						      <option value="name">Name</option>
						      <option value="id_category">Category</option>
						      <option value="quantity">Quantity</option>
						      <option value="date_updated">Date</option>
						  </select>
					</div>
					<div className="col-2">
							<select defaultValue="ASC" className="form-control" name="sort" onChange={this.handlerChange}>
				      		<option value="asc">ASC</option>
				      		<option value="desc">DESC</option>
				      </select>
					</div>
					<div className="col-2">
								<select defaultValue="6" className="form-control" name="limit" onChange={this.handlerChange}>
							      <option value="6">6</option>
							      <option value="9">9</option>
							      <option value="12">12</option>
							      <option value="15">15</option>
						    	</select>
					</div>
					<div className="col-2">
							<select defaultValue="Select Page" className="form-control" name="page" onChange={this.handlerChange}>
							  	<option disabled>Select Page</option>
								{
									this.props.pagination.map(num => {
										return <option value={num} key={num}>{num}</option>
									})
								}
							</select>
					</div>
					<div className="col-3">
							<form className="form-inline ml-auto float-right">
					        	<input className="form-control mr-sm-2" type="search" name="search" placeholder="Search" aria-label="Search" onChange={this.handlerChange} />
					    </form>
					</div>

				</div>
			</div>
		)
	}

}
export default Pagination;
