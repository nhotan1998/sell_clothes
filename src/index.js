import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom';
import Index from './components/Blog/Index';
import Detail from './components/Blog/Detail';
import Login from './components/Member/Login';
import Register from './components/Member/Register';
import Comment from './components/Blog/Comment';
import ListComment from './components/Blog/ListComment';
import Account from './components/Account/Index';
import HomeIndex from './components/Home/HomeIndex';
import ProductDetail from './components/Home/ProductDetail';
import CartProduct from './components/Home/CartProduct';





ReactDOM.render(
    <div>
      <Router>
        <App>
          <Switch>
            
            <Route path='/home/index' component={HomeIndex} />
            <Route path='/product/detail/:id' component={ProductDetail}/>
            <Route path='/product/cart' component={CartProduct} />
            <Route path='/blog/list' component={Index}/>
            <Route path='/blog/detail/:id' component={Detail}/>
            <Route path='/blog/comment/:id' component={Comment}/>
            <Route path='/blog/listcomment/:id' component={ListComment}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route ex component={Account} />
            
            
            
          </Switch>
        </App>
      </Router>
    </div>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
