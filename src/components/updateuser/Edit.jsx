import React, { useEffect, useState } from 'react'
import "../adduser/Add.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { url } from '../../path.js';

const Edit = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
  }
  const {id} = useParams();
  const navigate = useNavigate();
  const [user,setUser] = useState(users);
  const inputChangeHandeler = (e) => {
    const {name,value} = e.target;
    setUser({...user, [name]: value })
  }
  useEffect(() => {
    axios.get(`${url}/api/getone/${id}`)
      .then((response) =>{
        setUser(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])
  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`${url}/api/userupdate/${id}`,user)
      .then((response) => {
        toast.success(response.data.message, { position:"top-right"})
        navigate('/');
      }).catch(error => console.log(error));
  }
  return (
    <div className='adduser'>
      <Link to={"/"}>Back</Link>
      <h3>update user</h3>
      <form className='adduserform' onSubmit={submitForm}>
        <div className='inputGroup'>
          <label htmlFor="fname">First Name</label>
          <input type="text" value={user.fname} onChange={inputChangeHandeler} name="fname" id="fname" autoComplete='off' />
        </div>
        <div className='inputGroup'>
          <label htmlFor="lname">Last Name</label>
          <input type="text" value={user.lname} onChange={inputChangeHandeler} name="lname" id="lname" autoComplete='off' />
        </div>
        <div className='inputGroup'>
          <label htmlFor="email">Email</label>
          <input type="text" value={user.email} onChange={inputChangeHandeler} name="email" id="email" autoComplete='off' />
        </div>
        <div className='inputGroup'>
          <button type='submit'>update user</button>
        </div>
      </form>
    </div>
  )
}

export default Edit