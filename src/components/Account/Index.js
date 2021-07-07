import React , { Component } from 'react';
import App from './App';
import { Switch , Route } from "react-router-dom";
import Update from './Member/Update';
import List from './Product/List';
import AddProduct from './Product/AddProduct';
import UpdateProduct from './Product/UpdateProduct';


class Index extends Component{
    render () {
        return (
          <App>
            <Switch>
              <Route path='/account/member' component={Update} />
              <Route path='/account/product/list' component={List}/>
              <Route path='/account/product/add-product' component={AddProduct}/>
              <Route path='/account/product/update-product/:id?'  component={UpdateProduct}/>
            </Switch>
          </App>
        )
      }
}
export default Index;