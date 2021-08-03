import React , { Component } from 'react';
import  axios from 'axios';
import { Link } from 'react-router-dom';


class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            list:''
        }
       
    }
    componentDidMount(){
        axios.get('http://localhost:8080/laravel/public/api/blog')
        .then(res=>{
          console.log(res);
            this.setState({
                list: res.data.blog.data
            })    
        })
        .catch(function(error){
            console.log(error)
        })
        
    }
         
    renderData(){
        let {list} = this.state;
        // console.log(list);
        if(list.length > 0 ){
          return list.map((value,key)=>{
            return(
              <div  className="single-blog-post">
              <h3>Girls Pink T Shirt arrived in store</h3>
              <div className="post-meta">
                <ul>
                  <li><i className="fa fa-user" /> Mac Doe</li>
                  <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                  <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                </ul>
                <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                </span>
              </div>
              <a href>
                <img src={'http://localhost:8080/laravel/public/upload/Blog/image/' + value['image']} alt="" />
              </a>
              <p>{value['description']}</p>
              <Link to={'/blog/detail/' + value['id']} className="btn btn-primary" href>Read More</Link>
            </div>
                )
            })
          }
      } 
    render(){
        return(
          <div className='container'>
          <div className='row'>
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              {this.renderData()}
          </div>
        </div>
        </div>
        </div>
        )
    }
}
export default Index;


