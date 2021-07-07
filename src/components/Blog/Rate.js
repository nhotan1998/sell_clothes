import axios from 'axios';
import React , { Component } from 'react';
import StarRatings from 'react-star-ratings';
class Rate extends Component{
    constructor(props){
        super(props);
        this.state={
            msg:'',
            alert:'',
            rating:0,
            data:''
        }
        this.changeRating = this.changeRating.bind(this);
      
    }

    
changeRating(newRating,name){
//    console.log(Average);
// console.log(name);
    let isLogin = localStorage.getItem('isLogin');
    isLogin = JSON.parse(isLogin);
    // console.log(isLogin);

    if(!isLogin){
        this.setState({
            msg:'Vui long dang nhap để Rate'
        })
    }else{
        const userData = JSON.parse(localStorage['userData']);
        const blog_Id = this.props.blog_Id;
        // console.log(blog_Id);
        // console.log(userData);
        // console.log(userData.Auth.id);
        let url = ('http://localhost:8080/laravel/public/api/blog/rate/' + blog_Id);
        //  console.log(url);
        let accessToken = userData.success.token;
        // console.log(accessToken);

        let config = {
            headers:{
                        'Authorization':'Bearer ' + accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept':'application/json'
                    }
          };
        
            const formData = new FormData();
            formData.append('user_id',userData.Auth.id);
            formData.append('blog_id',blog_Id);
            formData.append('rate',this.state.rating);
            //  console.log(formData);
            axios.post(url,formData,config)
            .then(res=>{
                console.log(res);
                if(res.data.error){
                    this.setState({
                        alert:res.data.error
                    })
                }else{
                    console.log(res.data);
                }
            })
    }
    this.setState({
        rating:newRating
    })
}
componentDidMount(){
    const blog_Id = this.props.blog_Id;
    // console.log(blog_Id);
    axios.get('http://localhost:8080/laravel/public/api/blog/rate/'+blog_Id)
    .then(res=>{
        console.log(res);
        // console.log(res.data.data);
        this.setState({
            data: res.data.data
        }) 
            let {data} = this.state;
            var Array_rate = Object.values(data);
            console.log(Array_rate);
            let sum = 0 ;
            if(Array_rate.length>0){
                Array_rate.map((value,key)=>{
                    // console.log(value.rate);
                    sum += value.rate;
                    // console.log(sum);
                            })
                        }
            let {Average} = this.state;
            // console.log(Average);
            Average = sum/(Array_rate.length);
            
            this.setState({
                start:Average,
                TBC:Average
            })
    
    })
    
}







    render(){
        
        return (
            <div className="rating-area">
            <p style={{color:'red',fontWeight:'bold',textTransform:'uppercase'}}>{this.state.msg}</p>
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <StarRatings
                    rating={this.state.start}
                    starRatedColor="#df80ff"
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name='rating'
                />
                 <li className="color">{this.state.TBC} ( votes)</li>
            </ul>
            
            </div>            
        )
    }
}
export default Rate;