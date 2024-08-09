import React , {useState} from 'react'
import MainHeader from './MainHeader/MainHeader'
import {useNavigate} from "react-router-dom"

export default function MentorRegistationPage() {
  
  const [skills, setSkills]= useState("")
  let navigate=useNavigate()

  const onSubmit= async(e) =>{

    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/mentor/savementor" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
       
      },
      body:JSON.stringify({skill:skills.skills})
        
    } );  
    // const json=await response.json();
    // console.log(json)
    if(response.ok)
    {
      //redirect
      navigate('/mentormainpage')
    }
    else{
      alert("You are already registered as Mentor")
    }

  }

 
  const onChange=(e)=>{
    setSkills({...skills, [e.target.name]:e.target.value})
  }
  return (
    <div>
       <MainHeader/>
     
     <div className='container my-6'>
    
       <div class="mb-3">
   <label htmlFor="exampleFormControlTextarea1" className="form-label justify-center">Please mention skills that you posses for our mentorship</label>
   <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="skills" onChange={onChange} value={skills.skills} ></textarea>
 
   <button className='btn btn-primary justify-center' onClick={onSubmit}>Submit</button>
 </div>
    </div>
    </div>
  )
}
