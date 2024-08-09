import React , {useState} from 'react'
import MainHeader from './MainHeader/MainHeader'
import {useNavigate} from "react-router-dom"

export default function MenteeRegistrationPage() {


  const onChange=(e)=>{
    setSkills({...skills, [e.target.name]:e.target.value})
  }

   
  const [skills, setSkills]= useState("")
  let navigate=useNavigate()

  const onSubmit= async(e) =>{

    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/mentee/savementee" , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
       
      },
      body:JSON.stringify({skill:skills.skills})
        
    } );  
    // const json=await response.json();
    // console.log(json)
    console.log(response)
    if(response.ok)
    {
      //redirect
      navigate('/menteemainpage')
    }
    else{
      alert("You are already registered as Mentee")
    }

  }

  return (
    <div>
       <MainHeader/>
     
     <div className='container my-6'>
    
       <div class="mb-3">
   <label htmlFor="exampleFormControlTextarea1" className="form-label justify-center">Please mention skills that you want to gain from the mentors</label>
   <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="skills" onChange={onChange} value={skills.skills} ></textarea>
 
   <button className='btn btn-primary justify-center' onClick={onSubmit}>Submit</button>
 </div>
    </div>
    </div>
  )
}
