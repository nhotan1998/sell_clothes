import React , { Component } from 'react';
import {Link} from 'react-router-dom';
class MenuLeft extends Component{
    renderMenuLeft () {
        return (
            <div className="col-sm-3">
                <div className="left-sidebar">
                    <h2>Account</h2>
                    <div className="panel-group category-products" id="accordian">
                      <div className="panel panel-default">
                          <div className="panel-heading">
                              <h4 className="panel-title">
                                  <Link to="/account/member">
                                      <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                      Account
                                  </Link>
                              </h4>
                          </div>
                      </div>
                      <div className="panel panel-default">
                          <div className="panel-heading">
                              <h4 className="panel-title">
                                  <Link to="/account/product/list">
                                      <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                                      My product
                                  </Link>
                              </h4>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        )
      }
      render () {
        return (
          <>
            {this.renderMenuLeft()}
          </>
        )
      }
}
export default MenuLeft;