import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from '../../path.js';
import "./User.css";
const User = () => {
    const [Users,setuser] = useState([]);

    useEffect(()=>{
      const fetchData =async()=>{
       const response= await axios.get(`${url}/api/getall`)
       setuser(response.data)
      }
      fetchData()
    },[])
    const deleteUser = async(userId) =>{
        await axios.delete(`${url}/api/userDelete/${userId}`)
        .then((response)=>{
            setuser((prevuser)=>prevuser.filter((user)=>user._id !== userId))
            toast.success(response.data.msg,{position:"top-center"})
        }).catch((error)=>{
            console.log(error)
        })

    }
    return (
        <div className="userTable">
            <Link to={"/add"} className="addbutton">Add user</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Users.map((User,index)=>{
                            return(                
                    <tr key={User._id}>
                    <td>{index + 1}</td>
                    <td>{User.fname} {User.lname}</td>
                    <td>{User.email}</td>
                    <td className="actionbuttons">
                        <button onClick={()=> deleteUser(User._id)}>
                             <i className="fa-solid fa-trash"></i>
                        </button>
                        <Link to={`/edit/`+User._id}>Edit </Link>
                    </td>
                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default User;