import axios from 'axios';
import  React , { Component } from 'react';
import { Link } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';
class  List extends Component{
constructor(props){
    super(props);
    this.state= {
        data:'',
        getUserData:JSON.parse(localStorage['userData'])
    }
    this.Remove = this.Remove.bind(this);
}
    componentDidMount(){
        let accessToken = this.state.getUserData.success.token;
        // console.log(accessToken);
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
       axios.get('http://localhost:8080/laravel/public/api/user/my-product' , config)
       .then(res=>{
           console.log(res);
           this.setState({
               data:res.data.data
           })
       })
       .catch(function(error){
           console.log(error);
       })
    }
    Remove(data){
        // console.log(data);
    this.setState({
        data:data
    })
    }


    renderList(){
        let {data} = this.state;
        console.log(data);
        if(Object.keys(data).length>0){
            return Object.keys(data).map((item,index)=>{
                let array = JSON.parse(data[item]['image']);
                 console.log(array);
                return (
                    <tr>
                    <td className="cart_quantity">
                            <a>{data[item]['id']}</a>
                    </td>
                    <td className="cart_description">
                            <a>{data[item]['name']}</a>
                    </td>
                    <td >
                            <img width='50' height='50' src={'http://localhost:8080/laravel/public/upload/user/product/' + data[item]['id_user'] + '/'+ array[0] } />
                    </td>
                    <td className="cart_price">
                            <a>{data[item]['price']}$</a>
                    </td>
                    <td  >
                    <Link  to={'/account/product/update-product/' + data[item]['id']} ><i class="fa fa-edit" aria-hidden="true"></i></Link>
\                    </td>
                    <td >
                    <DeleteProduct Remove={this.Remove} id={data[item]['id']}  />   
                    </td>
                    </tr>
                )
            })
        }
    }
   
    render(){
        return(
            <div className="col-sm-9" id="cart_items">
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu">
                            <td>Id</td>
                            <td className="price">Name</td>
                            <td >Image</td>
                            <td className="description">Price</td>
                            <td className="total" colSpan="2">Action</td>
                        </tr>
                    </thead>
                    <tbody>
                    {this.renderList()}
                    </tbody>
                </table>
                <Link style={{float:'right'}} to='/account/product/add-product'   className="btn btn-default check_out">Add New</Link>
            </div>
        </div>
        )
    }
}
export default List;