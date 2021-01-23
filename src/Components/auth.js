import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import './authStyle.css'
import {bake_cookie, read_cookie} from 'sfcookies'
import { BaseUrl } from './BaseUrl'
export class Login extends Component {
    state={
        password:"",
        name:"",
        login:read_cookie('login')===true?true:false,
        error:"",
        email:"",
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submit=(e)=>{
        e.preventDefault();
        axios.post(BaseUrl+"getToken",{name:this.state.name,email:this.state.email}).then(res=>{
            if(res.data.err){
                this.setState({error:res.data.message})
            }
            else{
                bake_cookie("login",true)
                bake_cookie("token",res.data.token)
                this.setState({login:true})
            }
        }).catch(err=>{
            alert(err.message)
        })
    }
    render() {
      if(this.state.login){
        return(
            <Redirect to='/' />
        )
    }
        return (
            <div className="">
            <div className="form">
              <div className="container">
                <form onSubmit={this.submit}>
                  <input
                    placeholder="Name"
                    type="text"
                    name="name"
                    className="username"
                    onChange={this.onChange}
                    required
                  />
                  <label className="login-label" htmlFor="username1">
                    Username Required
                  </label>
                  <input
                    placeholder="email"
                    type="text"
                    className="password1"
                    name="email"
                    onChange={this.onChange}
                    required
                  />
                  <label className="login-label" htmlFor="password1">
                    Email Required
                  </label>
                  <div className="form-bottom">
                  {this.state.error!==""&&(<p style={{color:"red"}}>{this.state.error}</p>)}
                  <button id="login" className="button" type="submit" >Get Token </button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        )
    }
}

export default Login