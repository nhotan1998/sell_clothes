import axios from 'axios';
import React , { Component } from 'react';

class DeleteProduct extends Component{
constructor(props){
    super(props);
    this.state = {
        userData : JSON.parse(localStorage['userData'])
    }
    this.DeleteProduct = this.DeleteProduct.bind(this);
}
DeleteProduct(){
    let accessToken = this.state.userData.success.token;
    let config = { 
        headers: { 
        'Authorization': 'Bearer '+ accessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
        } 
    };
    let getId = this.props.id;
    let url = 'http://localhost:8080/laravel/public/api/user/delete-product/'+ getId;
    // console.log(url);
    axios.get(url,config)
    .then(res=>{
        // console.log(res.data.data);
        this.props.Remove(res.data.data);
    })
}

    render(){
        return(
            <a className="cart_quantity_delete" onClick={this.DeleteProduct}><i className="fa fa-times" /></a> 
        )
    }
}
export default DeleteProduct;