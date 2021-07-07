import React , { Component } from 'react';
import axios from 'axios'; 

class ListCart extends Component{
    constructor(props){
        super(props);
        this.state={
            data:'',
            getqty:'',
            qty:'',
            price:'',
            getData:'',
            name:'',
            image:'',
            total:'',
            gettotal:'',
            array:JSON.parse(localStorage['data'])
        }
        this.plus = this.plus.bind(this);
        this.sub = this.sub.bind(this);
        this.delete = this.delete.bind(this);
    }
    
    componentDidMount(){
       const getData = this.props.data;
    // console.log(getData);
    let array = JSON.parse(getData.image);
    // console.log(array);
    let id = getData.id;
    let getqty = getData.qty[id];
    // console.log(getqty);
    let price = getData.price;
    let Total = price*getqty;
    // console.log(total);
    // console.log(getqty);
    this.setState({
        price:getData.price,
        image:array[0],
        name:getData.name,
        total:Total,
        qty:getqty,
        data:getData
    })
    }
  
   plus(e){
    let {array} = this.state;
    // console.log(array);
    let {qty} = this.state;
    let {price} = this.state;
    let id = e.target.id;
    // console.log(id);
    this.setState({
        qty:parseInt(qty)+1,
        total : price * (parseInt(qty) + 1)
    })

    if(Object.keys(array).length>0){
        Object.keys(array).map((value,key)=>{
            // console.log(value);
            // console.log(id);
            if(value == id){
               array[value][id] +=1
            }
        })
        var convert = JSON.stringify(array);
        localStorage.setItem('data',convert);
    }
    

   
   }
   sub(e){
   let id = e.target.id; 
    console.log(id);
    let {array} = this.state;
    let {qty} = this.state;
    // console.log(qty);
    let {price} = this.state;

    this.setState({
        qty:parseInt(qty)-1,
        total : price * (parseInt(qty) - 1)
    })
    
    let Getqty = parseInt(qty)-1;
        if(Getqty<1){
            var check = window.confirm('Ban co muon xoa san pham ko ');
            if(check==true){
                this.props.Delete(id);
            }
            return false;
        }
        if(qty>1){
            if(Object.keys(array).length>0){
                Object.keys(array).map((key,index)=>{
                    if(key==id){
                        array[key][id] -=1;
                    }
                })
            }
            var convert = JSON.stringify(array);
            localStorage.setItem('data',convert);
    }
      
        
   }
    delete(e){
        let id = e.target.id; 
        console.log(id);
       var check = window.confirm("Ban có chắc chắn xóa san pham nay ko ");
       if(check == true){
          this.props.Delete(id);
       }
       return false;
    }  
        
  
    renderCart(){
        let {price,name,image,qty} = this.state;
        // console.log(image);
        let {total} = this.state;
        // console.log(total);
       let {data} = this.state;
    //    console.log(data);
        return (
            <tr>
               <td> <img style={{width:'100px',height:'100px'}} src={'http://localhost:8080/laravel/public/upload/user/product/' + data.id_user + '/'+ image} alt="" /></td>
                <td>{name}</td>  
                <td>${price}</td>
                <td className='cart_quantity'>
                <div className='cart_quantity_button'>   
                <a onClick={this.plus} id={data['id']}  className='cart_quantity_up' > + </a>
                <input class='cart_quantity_input' type='text' value={qty}  autocomplete='off' size='2' />
                <a onClick={this.sub} id={data['id']} className='cart_quantity_down'> - </a>
                </div>
                </td>
                <td>${total}</td>
                <td style={{margin:'35px 0'}} className='cart_delete'> 
                    <a  onClick={this.delete} id={data['id']}  className='cart_quantity_delete' ></a> 
                </td>
            </tr>
        )
                
    }


    render(){
        return(
                <>
                    {this.renderCart()}
                </>
        )
    }
}
export default ListCart;