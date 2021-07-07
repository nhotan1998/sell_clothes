import React, { Component } from 'react';
import MenuLeft from './MenuLeft';
class App extends Component {

 
  render () {
    return (
      <>
       <MenuLeft/>
        {this.props.children}
      </>
    )
  }
}
export default App