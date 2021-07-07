
import React , { Component } from 'react';
import {Link} from 'react-router-dom';

class ListComment extends Component{
constructor(props){
    super(props);
  
this.getId = this.getId.bind(this);
}

getId(event){
    event.preventDefault();
     const getId = event.target.id;
    console.log(getId);
    this.props.getidSubcomment(getId)
    
}
renderListCmt(){
    let comment = this.props.comment;
    if(comment.length>0){
        return comment.map((value,key)=>{
                
                if(value.id_comment==0){
                    return (
                     <>
                            <li style={{listStyle:'none'}} className="media">
                                    <a className="pull-left">
                                    <img style={{width:'100px',height:'100px'}} className="media-object" src={'http://localhost:8080/laravel/public/upload/user/avatar/' + value.image_user}/>
                                    </a>
                                    <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{value.name_user}</li>
                                        <li><i className="fa fa-clock-o" /> {value.updated_at}</li>
                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                    </ul>
                                    <p >{value.comment}</p>
                                    <Link to={'/blog/detail/' + value['id']} class="btn btn-primary" id={value.id}  onClick= {this.getId}><i class="fa fa-reply"></i>Replay</Link>
                                    
                                    </div>
                            </li>
                            {
                                  comment.map((value2,key2)=>{
                                           
                                            if(value2.id_comment == value.id){
                                                return(
                                                    //sua het value ben duoi thanh value2 giup a, roi chay lai thu
                                                    <li style={{listStyle:'none'}} className="media second-media">
                                                        <a className="pull-left" >
                                                        <img className="media-object" src={'http://localhost:8080/laravel/public/upload/user/avatar/' + value2.image_user} />
                                                        </a>
                                                        <div className="media-body">
                                                        <ul className="sinlge-post-meta">
                                                            <li><i className="fa fa-user" />{value2.name_user}</li>
                                                            <li><i className="fa fa-clock-o" /> {value2.updated_at}</li>
                                                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                                        </ul>
                                                        <p>{value2.comment}</p>
                                                        <a className="btn btn-primary" ><i className="fa fa-reply" />Replay</a>
                                                        </div>
                                                    </li>        
                                                    
                                                )
                                            }
                                         
                                    })
                                }                               
                    </>
                    )
                }
           
        })
    }
  }
 

  
  
  render(){
  
    return(
        <>
        {this.renderListCmt()}
        </>
    )
  }
}
export default ListComment;
