import React , {useState,useEffect}from 'react';
import { Link } from "react-router-dom"; 
import ChatIcon from '@mui/icons-material/Chat';

export default function YourMentee({ mentee }) {


  return (
    <div className="container my-6">
  <Link
    to={`/profile/${mentee._id}`}
    className="relative block overflow-hidden rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

    <div className="p-6 sm:flex sm:justify-between sm:gap-4">
      <div>
        <p className="mt-1 text-xs font-medium text-gray-600">{mentee.name}</p>
        
      
        <Link to="/message" className="button my-7 flex-shrink"><ChatIcon/> Chat</Link>
      </div>
      <p>{mentee.skill}</p>
     
      <div className="flex-shrink-0 mt-4 sm:mt-0">
        <img
          alt="Profile"
          src={mentee.profilePicture || "/img/profile-user.png"}
          className="h-16 w-16 rounded-full object-cover shadow-sm"
        />
      </div>
     
    </div>
  </Link>
</div>

  );
}
