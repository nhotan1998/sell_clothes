import React , { Component } from 'react';
import  axios from 'axios';
import ErrorForm from '../Error/ErrorForm';


class Login extends Component{
constructor(props){
    super(props);
    this.state={
        email:'',
        password:'',
        formErrors:{},
        msg:''
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
   
}
handleInput(event){
    const nameInput = event.target.name;
    const value = event.target.value;
    this.setState({
        [nameInput]:value
    })
}
handleChangeSubmit(event){
    event.preventDefault();
    let email = this.state.email;
    let pass = this.state.password;
    let ErrorForms = this.state.formErrors;
    let flag = true;
    if(!email){
        flag=false;
        ErrorForms.email = 'Vui long nhap email';
    }
    if(!pass){
        flag=false;
        ErrorForms.pass = 'Vui long nhap pass';
    }
    if(!flag){
        this.setState({
            formErrors : ErrorForms
        })
    }else{
        const user= {
            email:this.state.email,
            password:this.state.password,
            level:0
        }
        axios.post('http://localhost:8080/laravel/public/api/login' , user )
        .then(res=>{
            console.log(res);
            console.log(res.data);
            if(res.data.errors) {
                this.setState({
                    formErrors : res.data.errors
                })
            } 
                      
                localStorage.setItem('isLogin',JSON.stringify(true));
                
                var convert = JSON.stringify(res.data);
                localStorage.setItem('userData',convert);
                this.props.history.push('/blog/list');
               
        })
    }
}


    render(){
        return(
      
            
        <div className="col-sm-4 col-sm-offset-1">
        <div className="login-form">
          <h2>Login to your account</h2>
          <div><ErrorForm  formErrors={this.state.formErrors} /></div>
          <p style={{color: "blue"}}>{this.state.msg}</p>
          <form onSubmit={this.handleChangeSubmit} >
            <input type="text" placeholder="Nhap Email" name='email' onChange={this.handleInput} />
            <input type="password" placeholder="Nhap Password" name='password' onChange={this.handleInput}/>
            <span>
              <input type="checkbox" className="checkbox" /> 
              Keep me signed in 
            </span>
            <button type="submit"  className="btn btn-default">Login</button>
          </form>
          
        </div>{/*/login form*/}
      </div>
     
            )
    }
}
export default Login;