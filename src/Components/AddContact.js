import axios from 'axios'
import React, { Component } from 'react'
import { read_cookie } from 'sfcookies'

import {BaseUrl } from './BaseUrl'
export class EditForm extends Component {
    state={
        name:"",
        email:"",
        phone:"",
        error:"",
        token:read_cookie("token")
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    submit=(e)=>{
        e.preventDefault();
        this.addContact({
          name:this.state.name,
          email:this.state.email,
          phone:this.state.phone
        })
    }
    addContact=(data)=>{
      console.log(data)
      const options={
          headers:{
              "x-auth-token":this.state.token
          }
      }
      axios.post(BaseUrl+"addContact/",data,options).then(res=>{
        console.log(res.data)
          if(res.data.err){
            this.setState({
              error:res.data.message
            })
          }
          else{
            alert("contact added successfully")
              this.props.reloadData()
              this.props.cancel()
          }
      }).catch(err=>{
          console.log(err.message)
          alert("something went wrong")
      })
  }
    render() {
        // console.log(this.props.data)
        return (
            <div className="">
            <div style={{
                 textAlign: "center",
                 fontFamily: `"Raleway", sans-serif`,
                 height: '440px',
                 backgroundColor: 'white',
                 borderRadius: '10px',
                 position: 'absolute',
                 top: '40%',
                 left: '40%',
                 transform: 'translate(-50%, -50%)',
                 width: '400px'
            }}>
              <div className="container">
                <form onSubmit={this.submit}>
                  <input
                    placeholder="Name"
                    type="text"
                    name="name"
                    className="username"
                    onChange={this.onChange}
                    value={this.state.name}
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
                    value={this.state.email}
                    required
                  />
                  <label className="login-label" htmlFor="password1">
                    Email Required
                  </label>
                  <input
                    placeholder="Phone Number"
                    type="number"
                    name="phone"
                    className="password1"
                    value={this.state.phone===null?"":this.state.phone}
                    onChange={this.onChange}
                  />
                  <div className="form-bottom">
                  {this.state.error!==""&&(<p style={{color:"red"}}>{this.state.error}</p>)}
                  <button id="login" className="button" type="submit" >Add Contact </button>
                    
                  
                  </div>
                  <button  className="btn btn-danger" type="submit" onClick={this.props.cancel} >Cancel</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

export default EditForm
