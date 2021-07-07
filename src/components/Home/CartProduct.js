import axios from 'axios';
import React , { Component } from 'react';
import ListCart from './ListCart';

class CartProduct extends Component{
    constructor(props){
        super(props);
        this.state={
            data:'',
            obj:JSON.parse(localStorage['data'])
        }
        this.DeleteCart = this.DeleteCart.bind(this);
    }
    componentDidMount(){
        let url = 'http://localhost:8080/laravel/public/api/product/cart';
        let {obj} = this.state;
        // console.log(obj);
        axios.post(url , obj)
        .then(res=>{
           
           this.setState({
               data:res.data.data
           })
           
        })
        .catch(function(error){
            console.log(error);
        })
    }


    DeleteCart(id){
        console.log(id)
        let {data} = this.state;
        let {obj} = this.state;
        // console.log(data);
        // console.log(obj);
        if(Object.keys(data).length>0){
            Object.keys(data).map((key,index)=>{
                if(data[key]['id'] == id) {
                    delete data[key];
                    delete obj[id];
                }
            })
            
            var convert = JSON.stringify(obj);
            localStorage.setItem('data',convert);  
        }
        // console.log(data);
        // console.log(obj);
        this.setState({
            data:data
        })
         
    }

    renderCart(){
        let {data} = this.state;
        // console.log(data);
        if(Object.keys(data).length>0){
            return Object.keys(data).map((item,index)=>{
                return(
                    <ListCart  data={data[item]}  Delete={this.DeleteCart}   />
                )
            })
        }
    }
    
    render(){
        return(
                <section id="cart_items">
                    <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                        <li><a href="#">Home</a></li>
                        <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu">
                            <td className="image">Item</td>
                            <td className="description">Description</td>
                            <td className="price">Price</td>
                            <td className="quantity">Quantity</td>
                            <td className="total">Total</td>
                            <td />
                            </tr>
                        </thead>
                        <tbody>
                           {this.renderCart()}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </section>
        )
    }
}
export default CartProduct;