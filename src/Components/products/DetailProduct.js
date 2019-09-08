import React, { Component } from 'react';

export default class DetailProduct extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: []
        }
    }
    componentDidMount(){
        axios.get(`/products/${this.state.products.id_product}`)
        .then(response => this.setState({products: response.data.data }))
    }
    render(){
        return(
            <React.Fragment>
                {this.state.products.map(item=>{
                    
                })}
            </React.Fragment>
                
        )
    }
}