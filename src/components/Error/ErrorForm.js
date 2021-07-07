import React , { Component } from 'react';

class ErrorForm extends Component{
    constructor(props){
        super(props);
    }
    renderError(){
        let formError  = this.props.formErrors;
        if(Object.keys(formError).length>0){

            return Object.keys(formError).map((key,index)=>{
                    return (
                        <p style={{color: "red"}} key={index}>{formError[key]}</p>
                    )
            })
        }
    }
    render(){
        return(
            <>
            {this.renderError()}
            </>
        )
    }
}
export default ErrorForm;