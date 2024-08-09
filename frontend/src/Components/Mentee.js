import React , {useState,useEffect}from 'react';
import { Link } from "react-router-dom"; 

export default function Mentee({ mentee }) {


  const [user, setUser]=useState({})
 
  const host="http://localhost:5000"


  useEffect( ()=>{
    const fetchUser=async()=>{
      

     
      const response=await fetch(`${host}/api/users/getUser/${mentee.menteeId}`,
        {
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type':"application/json",
            
            }
        })

        if (!response.ok) {
          console.error('Failed to fetch user');
          return;
        }
        console.log("99")

        const json=await response.json()
       
        console.log(json)
        setUser(json)
       
    }
    fetchUser()
  }, [mentee.menteeId]);

  return (
    <div className="container my-3"> 
      <Link
        to={`/profile/${mentee.menteeId}`}
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >   </Link>
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <p className="mt-1 text-xs font-medium text-gray-600">By {user.name}</p>
          </div>

          <div className="hidden sm:block sm:shrink-0">
            <img
              alt=""
              src={user.profilePicture || "/img/profile-user.png"}
              className="size-16 rounded-lg object-cover shadow-sm"
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-pretty text-sm text-gray-500">{user.about}</p>
        </div>
   
    </div>
  );
}
