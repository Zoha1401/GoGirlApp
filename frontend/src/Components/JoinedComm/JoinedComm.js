import React from 'react'
import "./JoinedComm.css"
import { Link } from "react-router-dom"

export default function JoinedComm({comm}) {
  return (
    <>
    <div className="container">
      
                  
                       
    <button className="btn btn-success">     <Link className='commButton' to={`/communityProfile/${comm._id}`}>{comm.communityName}</Link></button>
              
                        
                    
                    
             
                
           
    </div>
    </>
  )
}
