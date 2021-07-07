import axios from 'axios';
import React , { Component } from 'react';
import ErrorForm  from '../../Error/ErrorForm';
class Update extends Component{
    constructor(props){
    super(props);
    const getUserData = JSON.parse(localStorage['userData']);
    // console.log(getUserData);
    this.state={
        token: getUserData.success.token,
        id:getUserData.Auth.id,
        name:getUserData.Auth.name,
        email:getUserData.Auth.email,
        phone:getUserData.Auth.phone,
        address:getUserData.Auth.address,
        country:getUserData.Auth.country,
        password:getUserData.Auth.password,
        avatar:'',
        formErrors:{},
        alert:''
       
    }
    this.handleInput = this.handleInput.bind(this);
    this.hanldleSubmit = this.hanldleSubmit.bind(this);
    this.handleUserInputFile = this.handleUserInputFile.bind(this);
    }
    handleInput(e){
        const nameInput = e.target.name;
        const value = e.target.value;
        this.setState({
            [nameInput] :value
        })
    }

    hanldleSubmit(e){
        e.preventDefault();
        let name = this.state.name;
        let country = this.state.country;
        let phone = this.state.phone;
        let address = this.state.address;
        let email = this.state.email;
        let password = this.state.password;
        let flag = true;
        let ErrorForms = this.state.formErrors;

        if(!name){
            flag=false;
            ErrorForms.name = 'Vui long nhap ten'
        }
        if(!country){
            flag=false;
            ErrorForms.country = 'Vui long nhap country'
        }
        if(!address){
            flag=false;
            ErrorForms.address = 'Vui long nhap dia chi'
        }
        if(!phone){
            flag=false;
            ErrorForms.phone = 'Vui long nhap so dien thoai'
        }
        if(!flag){
            this.setState({
                formErrors:ErrorForms
            })
        }else{
            let formData = new FormData();
            formData.append('name',name);
            formData.append('email',email);
            formData.append('password', password);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('country', country);
            formData.append('level', 0);
            if(this.state.avatar){
                formData.append('avatar',this.state.avatar);
            }
            let url = 'http://localhost:8080/laravel/public/api/user/update/' + this.state.id;
        //    console.log(url);
            // console.log(this.state.token);
            let accessToken = this.state.token;
            console.log(accessToken);
            let config={
                headers: { 
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
            }   
            axios.post(url,formData,config)
            .then(res=>{
                console.log(res);
                if(res.data.errors){
                   this.setState({
                    formErrors:res.data.errors
                   })
                }else{
                  let userData ={
                      Auth: res.data.Auth,
                      Token: res.data.success.token
                  }
                  let StateData = {
                    data:userData
                  }
                  localStorage.setItem('userData',JSON.stringify(StateData));
                }
            })
            .catch(function(error){
                console.log(error);
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
            
            <div className="col-sm-6" style={{float:'right'}}>
            <div className="signup-form">
            <h2>Update User!</h2>
            <p style={{color:'red'}}>{this.state.alert}</p>
            <p style={{color:'green'}}>{this.state.mgsSuccess}</p>
            <ErrorForm  formErrors={this.state.formErrors} />
              <form  onSubmit={this.hanldleSubmit} enctype="multipart/form-data">
                <input type="text" value={this.state.name} placeholder="Name" name='name' onChange={this.handleInput}/>
                <input readOnly type="email" value={this.state.email} placeholder="Email"  name='email'  onChange={this.handleInput}/>
                <input type="password"  value={this.state.password} placeholder="Password"  name='password' onChange={this.handleInput}/>
                <input type="text" value={this.state.phone} placeholder="Phone"  name='phone' onChange={this.handleInput}/>
                <input type="text"  value={this.state.address} placeholder="Address" name='address' onChange={this.handleInput}/>
                <input type="text" value={this.state.country}  onChange={this.handleInput} name="country" placeholder="Country"/>
                <input type="file"   multiple='multiple'  name ='avatar' onChange={this.handleUserInputFile}/>
                <button type="submit"  className="btn btn-default">Update</button>
              </form>
            </div>
          </div>
        )
    }
}
export default Update;