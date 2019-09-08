import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';
class QueryAction extends Component {
    state = {
        search : '%%',
        sortBy : 'name',
        sort: 'asc',
        limit: '10',
        page: '1'
    }

    hendlerChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
        setTimeout(() => this.props.callBack(this.state), 250)
    }
    render() {
        return(
            <div id="query">
                <Form.Control  as="select" name='sortBy' defaultValue="Sort By" onChange={this.hendlerChange}>
                <option disabled>Sort By</option>
                <option value="name">Name</option>
                <option value="id_category">Category</option>
                <option value="quantity">Quantity</option>
                <option value="date_updated">Date</option>
                </Form.Control>

                <Form.Control  as="select" defaultValue="ASC" name='sort' onChange={this.hendlerChange}>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
                </Form.Control>

                <Form.Control style={{float : 'left'}} as="select" defaultValue="5" name='limit' onChange={this.hendlerChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                </Form.Control>
            </div>
        )
    }
}
export default QueryAction;