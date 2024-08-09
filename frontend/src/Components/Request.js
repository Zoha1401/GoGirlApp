import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"; 

export default function Request({requested_mentee}) {
  const [user, setUser]=useState({})
  
    const handleClick= async ()=>{
        const response = await fetch(`http://localhost:5000/api/mentor/acceptRequests/${requested_mentee._id}` , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
           
          },
          
            
        } );  
        console.log(response)
        if(response.ok)
        {
          //redirect
          alert("Request accepted, Click on Chat with mentees to have a discussion with them")
          window.location.reload()
        }
        else{
          alert("You have already sent connection request")
        }


        const response1 = await fetch(`http://localhost:5000/api/conversations/${user._id}/${requested_mentee._id}` , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
           
          },
            
        } );  
        console.log(response1)
        if(response1.ok)
        {
           console.log("ok")
        }
        else{
          alert("ERROR")
        }
    
      }

      useEffect( ()=>{
        const fetchUser=async()=>{
          
    
    
          const response=await fetch(`http://localhost:5000/api/users/getUserbyauthtoken`,
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
    <div>
      <div className="container my-3">
      <article class="rounded-xl border-2 border-gray-100 bg-white">
  <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
  <Link
        to={`/profile/${requested_mentee.id}`} class="block shrink-0">
      <img
        alt=""
        src="/img/profile-user.png"
        class="size-14 rounded-lg object-cover"
      />
    </Link>

    <div>
      <h3 class="font-medium sm:text-lg">
        <a href="/" class="hover:underline">{requested_mentee.name}</a>
      </h3>

      <p class="line-clamp-2 text-sm text-gray-700">
        {requested_mentee.skill}
      </p>

      <div class="mt-2 sm:flex sm:items-center sm:gap-2">
       
        
        
       
      </div>
      <button type="button" class="btn btn-primary active" data-bs-toggle="button" aria-pressed="true" onClick={handleClick}>Accept</button>
    </div>
  </div>
</article></div>
    </div>
  )
}
