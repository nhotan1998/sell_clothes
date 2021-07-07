
import axios from 'axios';
import React , { Component } from 'react';
import { PopupboxManager,PopupboxContainer} from 'react-popupbox';


class ProductDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            data:'',
            image:'',
            larger:'',
            getId:'',
            showImage:''
        }
        this.handleCLick = this.handleCLick.bind(this);
        this.openPopupbox = this.openPopupbox.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:8080/laravel/public/api/product/detail/'+ this.props.match.params.id)
        .then(res=>{
            console.log(res.data.data);
            let array = JSON.parse(res.data.data.image);
            // console.log(array[0]);
            this.setState({
                data:res.data.data,
                image:array,
                larger:array[0]
            })
        })
        .catch(function(error){
            console.log(error);
        })
    }
    handleCLick(e){
        const getId = e.target.id;
        // console.log(getId);
        this.setState({
            showImage:getId
        })
    }
    renderSmall(){
       let {image} = this.state;
        let {data} = this.state;
        if(Object.keys(image).length>0){
            return Object.keys(image).map((item,value)=>{
                return (
             <img id={image[item]} onClick={this.handleCLick} src={'http://localhost:8080/laravel/public/upload/user/product/' + data.id_user + '/small_' + image[item]} alt="" />
                )
            })
        }
    }
    
    renderLarger(){
        let {larger} = this.state;
        // console.log(larger);
        let {showImage} = this.state;
        //    console.log(showImage);
        if(showImage){
            return(
            <img src={'http://localhost:8080/laravel/public/upload/user/product/' + this.state.data.id_user + '/larger_' + showImage} alt="" />
            )
        }else{
            return(
            <img src={'http://localhost:8080/laravel/public/upload/user/product/' + this.state.data.id_user + '/larger_' + larger} alt="" />
            )
        }
    }
   
    openPopupbox() {
        let {showImage} = this.state;
        console.log(showImage);
        const content =  <img style={{width:'300px',height:'350px'}}src={'http://localhost:8080/laravel/public/upload/user/product/' + this.state.data.id_user + '/' + showImage} alt="" />;
        PopupboxManager.open({
          content,
          config: {
            fadeIn: true,
            fadeInSpeed: 500
          }
        })
      }
   
  
    render(){
        // console.log(this.props.match.params.id)
        return(
            <div className='container'>
                <div className='row'>
                    <div className="col-sm-9 padding-right">
                        <div className="product-details">
                            <div className="col-sm-5">  
                            <div className="view-product">
                            {this.renderLarger()}

                            <h3 onClick={this.openPopupbox}>Zoom</h3>
                            <PopupboxContainer />
							</div>
                            <div id="similar-product" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                            <div className="item active">
								{this.renderSmall()}		
							</div>
                            </div>
                            <a className="left item-control" href="#similar-product" data-slide="prev">
                            <i className="fa fa-angle-left" />
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                            <i className="fa fa-angle-right" />
                            </a>
                            </div>
                            </div>  
                            <div className="col-sm-7">
                                <div className="product-information">
                                {/*/product-information*/}
                                <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                <h2>{this.state.data.name}</h2>
                                <p>Web ID: {this.state.data.id}</p>
                                <img src="images/product-details/rating.png" alt="" />
                                <span>
                                    <span>US ${this.state.data.price}</span>
                                    <label>Quantity:</label>
                                    <input type="text" defaultValue={1} />
                                    <button type="button" className="btn btn-fefault cart">
                                    <i className="fa fa-shopping-cart" />
                                     Add to cart
                                    </button>
                                </span>
                                <p><b>Availability:</b> In Stock</p>
                                <p><b>Condition:</b> New</p>
                                <p><b>Brand:</b>E-SHOPPER</p>
                                <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                                </div>
                                {/*/product-information*/}
                            </div>
                        </div>
                        <div className="category-tab shop-details-tab">
                        <div className="col-sm-12">
                            <ul className="nav nav-tabs">
                            <li><a href="#details" data-toggle="tab">Details</a></li>
                            <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                            <li><a href="#tag" data-toggle="tab">Tag</a></li>
                            <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                            </ul>
                        </div>
                            <div class="tab-content">
                            <div className="tab-pane fade active in" id="reviews">
                            <div className="col-sm-12">
                            <ul>
                                <li><a href><i className="fa fa-calendar-o" />{this.state.data.created_at}</a></li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur.</p>
                            <p><b>Write Your Review</b></p>
                            <form action="#">
                                <span>
                                <input type="text" placeholder="Your Name" />
                                <input type="email" placeholder="Email Address" />
                                </span>
                                <textarea name defaultValue={""} />
                                <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                <button type="button" className="btn btn-default pull-right">
                                Submit
                                </button>
                            </form>
                            </div>
                                </div>
                            </div>
                        </div>
                        <div className="recommended_items">
                        {/*recommended_items*/}
                        <h2 className="title text-center">recommended items</h2>
                        <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                            
                            </div>
                            <div className="item">
                            
                            </div>
                        </div>
                        <a className="left recommended-item-control" href="#recommended-item-carousel" data-slide="prev">
                            <i className="fa fa-angle-left" />
                        </a>
                        <a className="right recommended-item-control" href="#recommended-item-carousel" data-slide="next">
                            <i className="fa fa-angle-right" />
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductDetail;