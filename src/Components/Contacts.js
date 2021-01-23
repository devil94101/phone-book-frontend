import React, { Component } from 'react';
import PageNo from './pageNo';
import { Redirect} from 'react-router-dom'
import {delete_cookie, read_cookie} from 'sfcookies'
import axios from 'axios';
import { BaseUrl } from './BaseUrl';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Header from './header'
import EditIcon from '@material-ui/icons/Edit';
import EditForm from './editForm'
import AddForm from './AddContact'
class Contact extends Component {
      
    constructor(){
        super();
        
        this.state={
            name:"",
            number:"",
            pages:0,
            login:(read_cookie('login')===true)?true:false,
            load:false,
            phoneBook:[{name:"deepak",number:8954794568}],
            showForm:false,
            token:read_cookie('token'),
            edit:false,
            search:false,
            editData:{},
            addForm:false
            
           }
        
        this.cancelAdd=()=>{
            this.setState({addForm:false})
        }
        // this.addContact=(data)=>{
        //     const options={
        //         headers:{
        //             "x-auth-token":this.state.token
        //         }
        //     }
        //     axios.post(BaseUrl+"addContact/",data,options).then(res=>{
        //         alert("contact added successfully")
        //         this.cancelAdd()
        //         this.reloadData()
        //     }).catch(err=>{
        //         console.log(err.message)
        //         alert("something went wrong")
        //     })
        // }
                  
        this.setPage=(num)=>{
            this.setState({
                page:num
            })
        }    
        this.setData=(data)=>{
            this.setState({phoneBook:data})
        }        
        this.setPages=(num)=>{
            this.setState({pages:num})
        }
        this.deleteContact=(id)=>{
            const options={
                headers:{
                    "x-auth-token":this.state.token
                }
            }
            axios.delete(BaseUrl+"deleteContact/"+id,options).then(res=>{
                alert("contact deleted successfully")
                this.reloadData()
            }).catch(err=>{
                console.log(err.message)
                alert("something went wrong")
            })
        }
    }
    destroy=()=>{
        delete_cookie("login")
        delete_cookie("token")
        this.setState({
            login:false
        })
    }
    setEdit=(i)=>{
        this.setState({
            edit:true,
            editData:this.state.phoneBook[i]
        })
    }
    updateData=(i)=>{
        let url=BaseUrl+"allContacts/"+i
        if(this.state.search){
            url=BaseUrl+"search/"+i
        }
        const options={
            headers:{
                "x-auth-token":this.state.token
            }
        }
        axios.get(url,options).then(res=>{
            this.setState({phoneBook:res.data.data,count:res.data.count})
        }).catch(err=>{
            console.log(err.message)
            alert("something went wrong!")
        })
    }
    
    reloadData=()=>{
    this.setState({load:true})
        const options={
            headers:{
                "x-auth-token":this.state.token
            }
        }

        axios.get(BaseUrl+"/allContacts/",options).then(res=>{
            console.log(res.data)
            this.setState({
                load:false,
                phoneBook:res.data.data,
                pages:res.data.count
            })
        }).catch(err=>{
            this.setState({load:false})
            alert("something went wrong")
        })
    }
    componentDidMount(){
        if(this.state.load===false){
            this.reloadData()
        }
    }
    setPhoneBook=(data)=>{
        console.log(data)
        this.setState({phoneBook:data.data,search:true,pages:data.count})
    }
    cancelEdit=()=>{
        this.setState({
            edit:false,
            editData:{}
        })
    }
    setAdd=()=>{
        this.setState({addForm:true})
    }
  render() {
    //   console.log(this.state.token)
    if(!this.state.login){
        return(
            <Redirect to='/login'  />
        )
    }
    else if(this.state.load){
        return(<div>Loading...</div>)
    }
    else if(this.state.edit){
        return(
        <div>
            <EditForm data={this.state.editData} cancel={this.cancelEdit} reloadData={this.reloadData}></EditForm>
        </div>
        )
    }
    else if(this.state.addForm){
        return(
            <div>
                <AddForm cancel={this.cancelAdd} reloadData={this.reloadData}></AddForm>
            </div>
            )
    }
    else{
        return (
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                   <Header setPages={this.setPages} setPhoneBook={this.setPhoneBook} setAdd={this.setAdd}></Header>
                </div>
                  
                </div>
            <div className="row">
            <div className="col-md-4"></div>
              
              <div className="col-md-4">
              <div className="App">
              <h2 className="header">PhoneBook</h2>            
              
              {this.state.phoneBook.map((contact,i) =>
                 <div className="contacts" key={i}>
                     <div style={{
                         display:"flex",
                         justifyContent:'space-between'
                     }}>
                   <div>
                      <h5>{contact.name}</h5>
                      <p>{contact.email}</p>
                      <p>{contact.phone}</p>
                    </div> 
                    <div style={{
                        display:'flex',
                        justifyContent:"space-around",
                    }}>
                    <DeleteOutlineIcon onClick={()=>this.deleteContact(contact._id)}/>
                     <EditIcon onClick={()=>this.setEdit(i)}/>
                    </div>
                    </div>
                 <hr/>
                </div>
              )}
               
              </div>
              <button onClick={this.destroy}>Click</button>
              <PageNo pages={this.state.pages} update={this.updateData} ></PageNo>
              </div>
              
            
           <div className="col-md-4"></div>
           </div>
           </div>
          );
    }
   
  }
}

export default Contact;
