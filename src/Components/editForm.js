import React, { Component } from 'react'
import { BaseUrl } from './BaseUrl'
import axios from 'axios'
import { read_cookie } from 'sfcookies'
export class EditForm extends Component {
    state={
        name:this.props.data.name,
        email:this.props.data.email,
        phone:this.props.data.phone,
        token:read_cookie("token"),
        error:""
    }
    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    editData=(data)=>{
      console.log(data)
      const options={
          headers:{
              "x-auth-token":this.state.token
          }
      }
      axios.put(BaseUrl+"updateContact/"+data.id,{name:data.name,email:data.email,phone:data.phone},options).then(res=>{
         if(res.data.err){
          this.setState({
            error:res.data.message
          })
         }
         else{
          alert("contact updated successfully")
          this.props.cancel()
          this.props.reloadData()
         }
      }).catch(err=>{
          console.log(err.message)
          alert("something went wrong")
      })
    }
    render() {
        console.log(this.props.data)
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
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    this.editData({
                      name:this.state.name,
                      email:this.state.email,
                      phone:this.state.phone,
                        id:this.props.data._id
                      })}
                    }>
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
                  <button id="login" className="button" type="submit" >Edit Contact </button>

                  
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
