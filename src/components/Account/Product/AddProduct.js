import axios from 'axios';
import React , { Component } from 'react';
import ErrorForm from '../../Error/ErrorForm';



class AddProduct extends Component{
    constructor(props){
        super(props);
        const userData = JSON.parse(localStorage['userData']);
        // console.log(userData);
        this.state={
            category:'',
            brand:'',
            name:'',
            price:'',
            status:'',
            sale:'',
            detail:'',
            company:'',
            avatar:'',
            GetBrand:'',
            GetCategory:'',
            getToken:userData.success.token,
            formErrors:{},
            data:'',
            msg:''

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputFile = this.handleUserInputFile.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:8080/laravel/public/api/category-brand')
        .then(res=>{
            console.log(res);
            this.setState({
            GetBrand:res.data.brand,
            GetCategory:res.data.category
            })
        })
        .catch(function(error){
            console.log(error);
        })
    }

    renderGetBrand(){
        let {GetBrand} = this.state;
        if(GetBrand.length>0){
            return GetBrand.map((value,key)=>{
                return(
                    <option  value={value.id}>
                        {value.brand}
                    </option>  
                )
            })
        }
    }
    renderGetCategory(){
        let {GetCategory} = this.state;
        if(GetCategory.length>0){
            return GetCategory.map((value,key)=>{
                return (
                    <option  value={value.id}>
                        {value.category} 
                    </option>
                )
            })
        }
    }
    renderInput(){
        let {status} = this.state;
        if(status==2){
            return(
                <>
                <input style={{width:'100px',display:'inline-block'}} type='text' name='sale' onChange={this.handleUserInput}/>%
                </>
            )
        }
    }

   

    handleUserInput(e){
        const nameInput = e.target.name;
        const value = e.target.value;
        this.setState({
            [nameInput]:value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        let name = this.state.name;
        let price = this.state.price;
        let category = this.state.category;
        let brand = this.state.brand;
        let sale = this.state.sale;
        let status = this.state.status;
        let company = this.state.company;
        let detail = this.state.detail;
        let avatar = this.state.avatar;
        let flag = true;
        let ErrorForms = this.state.formErrors;
        if(!name){
            flag=false;
            ErrorForms.name = 'Vui long nhap name';
        } 
        if(!price){
            flag=false;
            ErrorForms.price = 'Vui long nhap price';
        }
        if(!category){
            flag=false;
            ErrorForms.category = 'Vui long chon category';
        }
        if(!brand){
            flag=false;
            ErrorForms.brand = 'Vui long chon brand';
        }
        if(status==2 && !sale){
            flag=false;
            ErrorForms.sale = 'Vui long nhap sale'
        }
        if(!company){
            flag=false;
            ErrorForms.company = 'Vui long nhap company';
        }
        if(!detail){
            flag=false;
            ErrorForms.detail = 'Vui long nhap detail';
        }
        if((avatar.length)>3){
            flag=false;
            ErrorForms.avatar = 'Chi cho phep toi da 3 anh';
        }
        // console.log(avatar.length);
        if(!flag){
            this.setState({
                formErrors : ErrorForms
            })
        }else{
            // console.log(this.state.getname);
            // console.log(this.state.category);
            //console.log(this.state.status);
            let formData = new FormData();
            formData.append('category',this.state.category);
            formData.append('brand',this.state.brand);
            formData.append('name',this.state.name);
            formData.append('company', this.state.company);
            formData.append('price',this.state.price);
            formData.append('detail',this.state.detail);
            formData.append('status',this.state.status);
            formData.append('sale',this.state.sale);
            Object.keys(avatar).map((item,index)=>{
              formData.append('file[]',avatar[item]);
            })
            let accessToken = this.state.getToken;
            let url = 'http://localhost:8080/laravel/public/api/user/add-product';
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
                } 
            };
            axios.post(url,formData,config)
            .then(res=>{
                console.log(res);
                this.setState({
                    msg:'Thêm Thành Công'
                })
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }


    handleUserInputFile(e){
        const file = e.target.files;
        //  console.log(file)
        if(file.length>0){
          Object.keys(file).map((value,key)=>{
                let size = file[value]['size'];
                // console.log(size);
                let name = file[value]['name'];
               
                //  console.log(name);
                // let cutName = name.substr(-3,3);
                // console.log(cutName);
                let imgArr=['png','jpg','jpeg'];
                let cutName = name.split('.');
                // console.log(cutName);
                let n = imgArr.includes(cutName[1]);
            
                // send file to api server
                if(size<1024*1024){
                if(n){
                        this.setState({
                            avatar:file
                        })   
                }else{
                    this.setState({
                        alert:'File Anh khong hop le'
                    })
                }      
                }else{
                    // console.log('2');
                        this.setState({
                            note: "Kich thuoc qua lon"
                        })   
                }
                })
            }  
    }



    

    
    render(){
        return(
            <div className="col-sm-9">
            <div className="col-sm-12">
                <div className="signup-form">
                    <h2>Create product!</h2>
                    <p style={{color:'red'}}>{this.state.note}</p>
                    <p style={{color:'red'}}>{this.state.alert}</p>
                    <p style={{color: "green"}}>{this.state.msg}</p>
                    <ErrorForm  formErrors={this.state.formErrors} />
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Name" name="name"  onChange={this.handleUserInput}/>
                        <input type="text" placeholder="Price"  name="price"  onChange={this.handleUserInput}/>
                        <select  name="category" onChange={this.handleUserInput}>
                            <option value="">Please choose category</option>
                            {this.renderGetCategory()}
                        </select>
                        
                        <select name="brand" onChange={this.handleUserInput}>
                            <option value="">Please choose brand</option>
                           {this.renderGetBrand()}
                        </select>
                        
                        <select  name="status" onChange={this.handleUserInput}>
                            <option value="0">Please choose status</option>
                            <option value="1">New</option>
                            <option value="2">Sale</option>
                        </select>
                        {this.renderInput()}
                        <input type="text" placeholder="Company profile"  name="company"  onChange={this.handleUserInput}/>
                        <input type="file" name="avatar" onChange={this.handleUserInputFile} multiple/>
                        <div className="imgPreview">
                            <ul>
                             
                            </ul>
                        </div>
                        <textarea   name="detail" placeholder="Detail" onChange={this.handleUserInput}></textarea>
                        
                        <button type="submit" className="btn btn-default">Signup</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}
export default AddProduct;