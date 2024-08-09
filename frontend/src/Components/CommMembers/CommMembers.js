import React from 'react'
import "./CommMembers.css"
import { Link } from "react-router-dom"


export default function CommMembers({mem}) {
  console.log(mem._id)
  return (
    <>
   <div className="container">
   
       <button className="btn btn-success"><Link to={`/profile/${mem._id}`}>{mem.name}</Link> </button>
   
</div>

    </>
  )
}
