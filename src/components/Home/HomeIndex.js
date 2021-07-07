import axios from 'axios';
import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import { AppContext } from '../AppContext/Appcontext';


class HomeIndex extends Component{
    static contextType = AppContext;

    constructor(props){
        super(props);
        this.state={
            userData:JSON.parse(localStorage['userData']),
            data:'',
            qty:'',
            getId:'',
            array:{}

        }
        this.AddToCart = this.AddToCart.bind(this);
    }
    componentDidMount(){
        let accessToken = this.state.userData.success.token;
        // console.log(accessToken);
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
        axios.get('http://localhost:8080/laravel/public/api/product', config)
        .then(res=>{
        //    console.log(res.data.data);
            this.setState({
                data:res.data.data
            })
        })
        .catch(function(error){
            console.log(error);
        })
    }

  
    
    AddToCart(e){
        e.preventDefault();
        let getId = e.target.id;
        // console.log(getId);
        var qty = 1;
        var obj = {
            [getId] : qty
        }
        var array = this.state.array;
        var check = 1;
        
       if(Object.keys(array).length>0){
           Object.keys(array).map((value,key)=>{
               if(value == getId){
                   array[value][getId] += 1;
                   check = 2 ;
               }
           })
       }
        if(check==1){
            array[getId] = obj;
        }
       
        
        // console.log(Object.keys(array).length);
        let cart = Object.keys(array).length;
        this.context.Getqty(cart);
        var convert = JSON.stringify(array);
        localStorage.setItem('data',convert);
        
        
    }
   
    

   

    renderProduct(){
        let {data} = this.state;
        // console.log(data);
        if(Object.keys(data).length>0){
            return Object.keys(data).map((item,index)=>{
                // console.log(data[item]['id_user']);
                let array = JSON.parse(data[item]['image']);
                // console.log(array);
                return (
                <div className="col-sm-4">
                    <div className="product-image-wrapper">
                    <div className="single-products">
                    <div className="productinfo text-center">
                        <img src={'http://localhost:8080/laravel/public/upload/user/product/' + data[item]['id_user'] + '/' + array[0]} alt="" />
                        <h2>${data[item]['price']}</h2>
                        <p>{data[item]['name']}</p>
                        <a  class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                        
                    </div>
                    <div className="product-overlay">
                        <div className="overlay-content">
                        <h2>${data[item]['price']}</h2>
                        <p>{data[item]['name']}</p>
                        <Link id={data[item]['id']}  onClick={this.AddToCart} class="btn btn-default add-to-cart" ><i class="fa fa-shopping-cart"></i>Add to cart</Link>
                        <Link style={{color:'#fff', fontSize:'20px'}} to={'/product/detail/' + data[item]['id']} className="btn">More</Link>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                )
            })
        }
    }
    render(){
        // console.log(this.context.state.qty);
        return(
            <div className='container'>
                <div className='row'>
                <div className="col-sm-9 padding-right">
                        <div className="features_items">
                            <h2 className="title text-center">Features Items</h2>
                            {this.renderProduct()}
                        </div>
                    </div>
                </div>
                </div>
        )
    }
}
export default HomeIndex;
