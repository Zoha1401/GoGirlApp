import React, { useEffect, useState } from 'react'
import "./MainHeader.css";
import { Search } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom"; 




export default function MainHeader() {
  
  let navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  const [user, setUser]=useState({})
  const host="http://localhost:5000"

  useEffect( ()=>{
    const fetchUser=async()=>{
      


      const response=await fetch(`${host}/api/users/getUserbyauthtoken`,
        {
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type':"application/json",
                'auth-token':localStorage.getItem('token')
            }
        })
        const json=await response.json()
        console.log(json)
        setUser(json)
        console.log(user)
    }
    fetchUser()



  },[])
  

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">GoGirl</span>
          <span className="logo1">Home</span>
          <span className="logo1" onClick={handleLogout}>Logout</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar mx-40">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
          
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink"></span>
        </div>
        <span className="logo1"></span>
        <Link to={`/yourprofile/${user._id}`}>
          <img
            src={ "/img/profile-user.png"}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>

    
    </div>
  )
}
