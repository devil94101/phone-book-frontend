import React, { Component } from 'react'
import { BaseUrl } from './BaseUrl';
import axios from 'axios'
import { read_cookie } from 'sfcookies';
export class header extends Component {


    state={
        search:"",
        token:read_cookie("token")
    }
    submit=(e)=>{
        e.preventDefault();
        const options={
            headers:{
                "x-auth-token":this.state.token
            }
        }
        axios.get(BaseUrl+"search/"+this.state.search,options).then(res=>{
            
            this.props.setPhoneBook(res.data)
        }).catch(err=>{
            console.log(err.message)
            alert("something went wrong ")
        })
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="/">Home</a>
                <div className="navbar-brand" style={{
                    cursor:"pointer"
                }} onClick={this.props.setAdd}>Add Contact</div>

                <form className="form-inline" onSubmit={this.submit}>
                    <input className="form-control mr-sm-2" type="search" value={this.state.search} onChange={(e)=>this.setState({search:e.target.value})} placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                </nav>
            </div>
        )
    }
}

export default header
