import React , { Component } from 'react';
import  axios from 'axios';
import MenuLeft from '../Layout/MenuLeft';
import Comment from './Comment';
import ListComment from './ListComment';
import Rate from './Rate';
class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            data:'',
            comment:'',
            idReplay:''
        }
        this.getComment = this.getComment.bind(this);
        this.getidSubcomment = this.getidSubcomment.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:8080/laravel/public/api/blog/detail/' + this.props.match.params.id)
        .then(res=>{
          console.log(res);
            this.setState({
                data: res.data.data,
                comment:res.data.data.comment
            }) 
            
        })
        .catch(function(error){
            console.log(error)
        })
        
    }
    
    getComment(data){
      // console.log(data);
      this.setState({
        comment: this.state.comment.concat(data)
      })
    }

    getidSubcomment(getId){
    //  console.log(getId);
     this.setState({
      idReplay:getId
     })
    }


    

    
   
    render(){
        //  console.log(this.props.match.params.id);
        return(
        <div className='container'>
        <div className='row'>
          <div class="col-sm-9">
           
            <div>
        <a href>
        <img src={'http://localhost:8080/laravel/public/upload/Blog/image/' + this.state.data.image}/>
        </a>
          <p>{this.state.data.content}</p>
        <div className="pager-area">
        <ul className="pager pull-right">
          <li><a href="#">Prev</a></li>
          <li><a href="#">Next</a></li>
        </ul>
      </div>
        <div className="rating-area">
        <Rate   blog_Id={this.props.match.params.id}/>
      </div>
      <div className="socials-share">
        <a href><img src="images/blog/socials.png" alt="" /></a>
      </div>
      <div className="response-area">
        
          <ListComment  getidSubcomment={this.getidSubcomment} comment={this.state.comment}/>
          <Comment  Id_blog={this.props.match.params.id} idSub={this.state.idReplay}  getComment={this.getComment} />
        </div>
        </div>
        </div>
        </div>
        </div>
        )
    }
}
export default Detail;