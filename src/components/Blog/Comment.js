import axios from 'axios';
import React , { Component } from 'react';
import {Link} from 'react-router-dom';

class Comment extends Component{
constructor(props){
    super(props);
    this.state={
        id_blog:'',
        id_user:'',
        name_user:'',
        comment:'',
        image_user:'',
        msg:'',
        Error:'',
        formErrors:'',
        success:'',
        data:''

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
 
}
handleInput(event){
    const nameInput = event.target.name;
    const value = event.target.value;
    this.setState({
        [nameInput]:value
    })
}
handleSubmit(event){
    event.preventDefault(); // dung su kien mac dinh cua form
    
    // - kiem tra da login chua?
    // + chua thi bao loi: 
    // + roi thi cho phep binhluan:
    //   ++ neu chua nhap cmt thi bao loi 
    //   ++ neu nhap roi thi tien hanh lay all nhung thong tin ma api muon de truyen qua cho no :
    //   khi co all thong tin muon roi thi tien truyn qua api 
    //   cach truyen data qua api co ràng buoc login( tuc la token)
    //   - truyen token qua kem api 
    //   - va tat cac data truyen qua api kem token phai tryen duoi dang formData(1 form cua js)
   
    let {comment} = this.state;
    let isLogin = localStorage.getItem('isLogin');
    isLogin = JSON.parse(isLogin);
    console.log(isLogin);
    if(!isLogin){
      this.setState({
        Error:'Vui long dang nhap'
      
      })
    }
    else{
      if(!comment){
        this.setState({
          msg:'vui long nhap binh luan cua ban'
        })
      }else{
        const userData = JSON.parse(localStorage['userData']);
       const Id_blog = this.props.Id_blog;
        let url = 'http://localhost:8080/laravel/public/api/blog/comment/'+ Id_blog;
        //  console.log(url);
        // console.log(Id_blog);
        //  console.log(userData);
        // console.log(userData.Auth.avatar);
        // console.log(userData.Auth.name);
        // console.log(userData.Auth.id);
        // console.log(this.state.comment);
        let accessToken = userData.success.token;
        //  console.log(accessToken);
        let config = {
          headers:{
                      'Authorization':'Bearer ' + accessToken,
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept':'application/json'
                  }
        };
       // lam lan sau chu y test xem data hien thi dung hay k nhe
        let {idSub} = this.props
        // console.log(idSub)
         if(comment){
            const formData = new FormData();
            formData.append('id_blog', Id_blog);
            formData.append('id_user', userData.Auth.id);
            formData.append('comment', this.state.comment);
            formData.append('image_user', userData.Auth.avatar);
            formData.append('name_user', userData.Auth.name);
            
            formData.append('id_comment', idSub?idSub:0);
            // Nếu this.props.idSub tồn tại thì tra ve idSub còn ko tòn tại tra ve 0 
            axios.post(url , formData , config )
            .then(res=>{
              console.log(res);
              // console.log(res.data.data.id);
              if(res.data.errors) {
                this.setState({
                    formErrors : res.data.errors
                })
                } else {
                    this.props.getComment(res.data.data)
              }   
            })
        }
    }
  }
}

  render(){
    return(
        <>  
      
        <div className="respon-area">
          <h3>{this.state.title}</h3>
         <p style={{color: "red",fontWeight:'bold',textTransform:'uppercase'}}>{this.state.msg}</p>
         <p style={{color: "red",fontWeight:'bold',textTransform:'uppercase'}}>{this.state.Error}</p>
         <p style={{color: "green",fontWeight:'bold',textTransform:'uppercase'}} >{this.state.success}</p>
        <form  onSubmit={this.handleSubmit}>
            <div className="blank-arrow">
            <label>Your Name</label>
            </div>
            <span>*</span>
            <textarea name="comment" rows={11} defaultValue={""}  onChange={this.handleInput}/>
            <button className="btn btn-primary">post comment</button>
        </form>
      </div>
    </>
    )
  }
}
export default Comment;
