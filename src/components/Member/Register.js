import axios from 'axios';
import React , { Component } from 'react';
import ErrorForm from '../Error/ErrorForm';

class Register  extends Component{
    constructor(props){
        super(props);
        
        this.state=({
            name:'',
            email:'',
            password:'',
            address:'',
            phone:'',
            avatar:'',
            msg:'',
            formErrors:{},
            note:'',
            alert:''
            
        })
        this.handleInput = this.handleInput.bind(this);
        this.hanldleSubmit = this.hanldleSubmit.bind(this);
        this.handleUserInputFile = this.handleUserInputFile.bind(this);
    }
    handleInput(event){
        const nameInput = event.target.name; //cai nay lay name
        const value = event.target.value;
        this.setState({
            [nameInput]:value
        })
        
    }
    hanldleSubmit(event){
        event.preventDefault();
        
        let {email, password, name,address,phone,avatar} = this.state;
        let ErrorForms = this.state.formErrors;
        let flag = true;
        
        
    
        if(email==''){
            flag=false;
            ErrorForms.email = 'Vui long nhap email';
        }
        if(password==''){
            flag=false;
            ErrorForms.pass = 'Vui long nhap pass';
        }
        if(name==''){
            flag = false;
            ErrorForms.name = 'Vui long nhap name';
        }
        if(phone==''){
            flag=false;
            ErrorForms.phone = 'Vui long nhap phone';
        }
        if(address==''){
            flag=false;
            ErrorForms.address = 'Vui long nhap address';
        }
        if(avatar == ""){
            flag=false;
            ErrorForms.avatar = 'Vui lòng tải ảnh lên'
           
      
        }
        
        if(!flag){
            this.setState({
                formErrors : ErrorForms
            })
        }else{
            const user ={
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                address:this.state.address,
                phone: this.state.phone,
                avatar:this.state.avatar,
                level : 0
            }
            axios.post('http://localhost:8080/laravel/public/api/register' , user )
            .then(res=>{
                console.log(res);
                console.log(res.data)
                if(res.data.errors) {
                    this.setState({
                        formErrors : res.data.errors
                    })
                } else {
                    this.setState({
                        msg: "Dang Ki Thanh Cong"
                    })

                }   
               
            })
        }
    }
    handleUserInputFile (e){
        const file = e.target.files;
         console.log(file)
        let reader = new FileReader();
        reader.onload = (e)=>{
            this.setState({
                file:file[0]
            })
        }
        
        let size = e.target.files[0].size;
        // console.log(size);
        let name = e.target.files[0].name;
        //  console.log(name);
        // let cutName = name.substr(-3,3);
        // console.log(cutName);

       let imgArr=['png','PNG','jpg','JPG','jpeg','JPEG'];
        let cutName = name.split('.');
        console.log(cutName);
        let n = imgArr.includes(cutName[1]);
        // send file to api server
        if(size<1024*1024){
           if(n){
            reader.onload = (e)=>{
                this.setState({
                    avatar:e.target.result
                })
            }
           }else{
               this.setState({
                alert:'File Anh khong hop le'
               })
           }
                    
        }else{
            // console.log('2');
            reader.onload = (e)=>{
                this.setState({
                    note: "Kich thuoc qua lon"
                })
            }
        }
        
        reader.readAsDataURL(file[0]);
      }					

    render(){
        return(
            <div className="col-sm-4">
            <div className="signup-form">{/*sign up form*/}
              <h2>New User Signup!</h2>
              <div><ErrorForm  formErrors={this.state.formErrors} /></div>
              <p style={{color: "green"}}>{this.state.msg}</p>
              <p style={{color: "red"}}>{this.state.note}</p>
              <p style={{color: "red"}}>{this.state.alert}</p>
              <form onSubmit={this.hanldleSubmit} enctype="multipart/form-data">
                <input type="text" placeholder="Name" name='name' onChange={this.handleInput}/>
                <input type="email" placeholder="Email"  name='email' onChange={this.handleInput}/>
                <input type="password" placeholder="Password"  name='password' onChange={this.handleInput}/>
                <input type="text" placeholder="Phone"  name='phone' onChange={this.handleInput}/>
                <input type="text" placeholder="Address" name='address' onChange={this.handleInput}/>
                <input type="file"  multiple='multiple'  name ='avatar' onChange={this.handleUserInputFile}/>
                <button type="submit" className="btn btn-default">Signup</button>
              </form>
            </div>{/*/sign up form*/}
          </div>
        )
    }
}
export default Register;

// kiem tra loi: 
// - minh tu bat 
// - gui data form qua API, ben backend tu bat