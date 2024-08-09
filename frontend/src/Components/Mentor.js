import React from 'react'

export default function Mentor({mentor}) {

  // Displays all the mentors
  const handleClick= async()=>{
    const mentorId=mentor.mentorId
    const response = await fetch(`http://localhost:5000/api/mentee/connectmentor/${mentorId}` , {
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
      alert("Connection request sent")
    }
    else{
      alert("You have already sent connection request")
    }

  }


  return (
    <div>
      <div className="container my-3">
      <article class="rounded-xl border-2 border-gray-100 bg-white">
  <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
    <a href="/" class="block shrink-0">
      <img
        alt=""
        src="/img/profile-user.png"
        class="size-14 rounded-lg object-cover"
      />
    </a>

    <div>
      <h3 class="font-medium sm:text-lg">
        <a href="/" class="hover:underline">{mentor.mentorName}</a>
      </h3>

      <p class="line-clamp-2 text-sm text-gray-700">
        {mentor.skill}
      </p>

      <div class="mt-2 sm:flex sm:items-center sm:gap-2">
        <div class="flex items-center gap-1 text-gray-500">
         

          <p class="text-xs">{mentor.mentees.length} mentees</p>
        </div>

        
        
       
      </div>
      <button type="button" class="btn btn-primary active" data-bs-toggle="button" aria-pressed="true" onClick={handleClick}>Connect</button>
    </div>
  </div>
</article></div>
    </div>
  )
}
