import React , {  Component } from 'react';
import ErrorForm from '../../Error/ErrorForm';
import axios from 'axios';

class UpdateProduct extends Component{
    constructor(props){
        super(props);
        
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
            formErrors:{},
            data:'',
            userData:JSON.parse(localStorage['userData']),
            images:'',
            avatarCheckbox:[],
            arrayA:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputFile = this.handleUserInputFile.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
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
        // get api user/product
        let accessToken = this.state.userData.success.token;
       
        // console.log(accessToken);
        let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
        };
        let url = 'http://localhost:8080/laravel/public/api/user/product/' + this.props.match.params.id;
        //  console.log(url);
        axios.get(url,config)
        .then(res=>{
            console.log(res);
            this.setState({
                name:res.data.data.name,
                price:res.data.data.price,
                category:res.data.data.id_category,
                brand:res.data.data.id_brand,
                sale:res.data.data.sale,
                company:res.data.data.company_profile,
                detail:res.data.data.detail,
                status:res.data.data.status,
                arrayA:res.data.data.image
            })
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
    renderImage(){
       let {arrayA} = this.state;
        //  console.log(arrayA);
        if(Object.keys(arrayA).length>0){
            return Object.keys(arrayA).map((item,index)=>{
                // console.log(arrayA[item]);
                return (
                    <li style={{display:'inline-block',margin:'0 10px'}}>
                        <img width='50' height='50'  src={'http://localhost:8080/laravel/public/upload/user/product/' + this.state.userData.Auth.id + '/' + arrayA[item]} />
                        <input  name="avatarCheckbox" type="checkbox"  value={arrayA[item]} onChange={this.handleCheckBox} />
                    </li>
                    )
                })
            }
    }
   

    handleUserInput(e){
        const nameInput = e.target.name;
        const value = e.target.value;
        this.setState({
            [nameInput]:value
        })
    }

    handleCheckBox(e){   
        const value = e.target.value;
        const checked = e.target.checked;
        let CheckBox = this.state.avatarCheckbox;
         if(checked){
                CheckBox.push(value);
                this.setState({
                    avatarCheckBox:CheckBox
                })
        }else{
                let index = CheckBox.indexOf(value);
                if(index>-1){
                    CheckBox.splice(index,1);
                }
        }
         
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
        // console.log(avatar.length)
        let flag = true;
        let ErrorForms = this.state.formErrors;
        let avatarCheckBox= this.state.avatarCheckbox;
        // console.log(avatarCheckBox);
        let arrayA = this.state.arrayA;
        // console.log(arrayA);
        
       
       
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
            ErrorForms.avatar = 'Chi cho phep up toi da 3 anh';
        }
       if(((arrayA.length)+(avatar.length))-(avatarCheckBox.length)>3){
        flag=false;
        ErrorForms.avatarCheckBox = 'Cho phép 3 ảnh thôi'
       }
        
        if(!avatar){
            flag=false;
            ErrorForms.avatar = 'Ảnh ko được để trống'
        }
        // console.log(avatar);
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
            Object.keys( avatarCheckBox).map((item,index)=>{
                formData.append('avatarCheckBox[]', avatarCheckBox[item]);
            })
            let accessToken = this.state.userData.success.token;
            // console.log(accessToken);
            let config = { 
                headers: { 
                'Authorization': 'Bearer '+ accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
                } 
            };
            let url = 'http://localhost:8080/laravel/public/api/user/edit-product/' + this.props.match.params.id;
            console.log(url);
            
            axios.post(url,formData,config)
            .then(res=>{
                console.log(res);
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
        // console.log(this.props)
        return(
            <div className="col-sm-9">
            <div className="col-sm-12">
                <div className="signup-form">
                    <h2>Update product!</h2>
                    <ErrorForm  formErrors={this.state.formErrors} />
                    <form onSubmit={this.handleSubmit}>
                        <input  value={this.state.name} type="text" placeholder="Name" name="name"  onChange={this.handleUserInput}/>
                        <input value={this.state.price} type="text" placeholder="Price"  name="price"  onChange={this.handleUserInput}/>
                        <select value={this.state.category} name="category" onChange={this.handleUserInput}>
                            <option >Please choose category</option>
                            {this.renderGetCategory()}
                        </select>
                        
                        <select value={this.state.brand} name="brand" onChange={this.handleUserInput}>
                            <option >Please choose brand</option>
                            {this.renderGetBrand()}
                        </select>
                        
                        <select value={this.state.status} name="status" onChange={this.handleUserInput}>
                            <option value="0">Please choose status</option>
                            <option value="1">New</option>
                            <option value="2">Sale</option>
                        </select>
                        {this.renderInput()}
                        <input value={this.state.company} type="text" placeholder="Company profile"  name="company"  onChange={this.handleUserInput}/>
                        <input type="file" name="avatar" onChange={this.handleUserInputFile} multiple/>
                        {this.renderImage()}
                        <div className="imgPreview">
                            <ul>
                             
                            </ul>
                        </div>
                        <textarea value={this.state.detail}  name="detail" placeholder="Detail" onChange={this.handleUserInput}></textarea>
                        
                        <button type="submit" className="btn btn-default">Update</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}
export default UpdateProduct;