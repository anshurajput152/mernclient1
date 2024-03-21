import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
// import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Add.css";
import toast from 'react-hot-toast';
import { url } from '../../path.js';
 const Add = () => {


    const users = {
        fname:"",
        lname:"",
        email:"",
        password:""
    };
           
    
    const [user,setuser]= useState(users);
    const navigate=useNavigate();
    const inputHandler =(e)=>{
        const {name,value} = e.target;
      
        setuser ({...user,[name]:value});
    }

    const submitForm = async(e) =>{
        e.preventDefault();
        await axios.post(`${url}/api/create`,user)
        .then((response)=>{
          toast.success(response.data.msg,{position:"top-right"})
          navigate("/")
        })
        .catch(error=>console.log(error))
    }
    
  return (
    <div className='adduser'>
        <Link to={"/"}>Back</Link>
        <h3>Add new user</h3>
        <form className='adduserform' onSubmit={submitForm}>
            <div className='inputGroup'>
                <label htmlFor="fname">First Name</label>
                <input type="text" onChange={inputHandler} name="fname" id="fname" autoComplete='off' />
            </div>
            <div className='inputGroup'>
                <label htmlFor="lname">Last Name</label>
                <input type="text" onChange={inputHandler} name="lname" id="lname" autoComplete='off' />
            </div>
            <div className='inputGroup'>
                <label htmlFor="email">Email</label>
                <input type="text" onChange={inputHandler} name="email" id="email" autoComplete='off' />
            </div>
            <div className='inputGroup'>
                <label htmlFor="password">Password</label>
                <input type="text" onChange={inputHandler} name="password" id="password" autoComplete='off' />
            </div>
            <div className='inputGroup'>
               <button type='submit'>Add user</button>
            </div>
        </form>
        </div>
  )
}

export default Add
