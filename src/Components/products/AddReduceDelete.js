import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


 const token = localStorage.getItem('token');
class AddReduceDelete extends Component {
	state = {
		quantity : 0,
	}

	AddReduceQty = e => {
        const {id} = this.props.item;
        e.preventDefault();
        const action = e.target.value;
        axios.patch(`/products/${id}?act=${action}`, {headers: {authorization: token}})
        .then(res=>{
            if(action === 'add'){
                this.props.item.quantity += 1;
                this.setState({quantity: this.props.item.quantity})
                alert('add')
            }else{
                this.props.item.quantity -= 1;
                this.setState({quantity: this.props.item.quantity})
                alert('reduce')
            }
        })
        .catch(err => console.log(err))
    }
	render() {
		const {id, name, image, category, quantity} = this.props.item;
		return (
			<div className='border col-3 border col-3 mx-4 mt-5 mb-3 p-0'>
				<div className="text-center"><Link to={'/products/' + id } ><img src={image} onError={() => {this.props.item.image = 'https://icon-library.net/images/inventory-icon/inventory-icon-10.jpg'; this.forceUpdate()}}  className="img-fluid d-inline-block img-h" /></Link></div>
				<div className="p-3">
					<h5><Link to={'/products/' + id } style={{textDecoration: 'none'}}>{name}</Link></h5>
					<p>Category: {category}<br/>
					   Quantity: {quantity}</p>

					<button onClick={this.AddReduceQty} className="btn btn-primary mr-2" value="add"> Add </button>
					<button onClick={this.AddReduceQty} className="btn btn-warning mr-2" value="reduce"> Reduce </button>
					<button type="button" onClick={this.props.delete.bind(this, id)} className="btn btn-danger"> Delete </button>

				</div>
			</div>
		)
	}
}
export default AddReduceDelete;
