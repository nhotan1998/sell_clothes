import React , { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MenuLeft from './components/Layout/MenuLeft';
import { AppContext } from './components/AppContext/Appcontext';



class App extends Component{
  constructor(props){
    super(props);
    this.state={
      qty:0
    }
    this.Stateqty = this.Stateqty.bind(this);
  }

Stateqty(cart){
console.log(cart);
this.setState({
qty:cart
})
}
  render(){
    console.log(this.props);
    
    return(
      <AppContext.Provider
        value={{
          state : this.state,
          Getqty:this.Stateqty
        }}
      >
        <>
         <Header />
         <section>
         <div className="container">
			    <div className="row">
          {this.props.location.pathname.includes("account") || this.props.location.pathname.includes("product/cart") ? '' : <MenuLeft />}
          {this.props.children}
          </div>
        </div>
         </section>
         <Footer/>
       </>

      </AppContext.Provider>
    )
  }
}
export default withRouter(App);
