import React from 'react'
import {useNavigate} from "react-router-dom"

export default function Community({comm}) {
  
  let navigate=useNavigate()
  const handleJoin= async(e)=>{
    e.preventDefault()

    try{

    const response = await fetch (`http://localhost:5000/api/community/joinCommunity/${comm._id}` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token':localStorage.getItem('token')
       
      },
        
    } );  
    const json=await response.json();
    console.log(json)
    if(response.ok)
    {
      //redirect
      navigate('/mainpage')
    }
    else{
      alert("Failed to join")
    }
  }
  catch(error)
  {
    console.log("Some error has occured")
  }
  

  }



  return (
    <div>
      

<div className="container"><article
  class="hover:animate-background rounded-xl bg-gradient-to-r my-4 from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
>
  <div class="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
    <h2 class="block text-xl text-gray-900"> <b>{comm.communityName}</b> </h2>

    
      <h3 class="mt-0.5 text-s my-4 font-medium text-gray-500">
        {comm.desc}
      </h3>
  


<button
  class="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
   onClick={handleJoin} 
>
  <span
    class="block rounded-full bg-white px-8 py-3 my-4 text-pink-500 font-medium group-hover:bg-transparent"
  >
    Join Community
  </span>
</button>

    
  </div>
</article></div>

{/* <div className="container"> A button that will handle join community here</div> */}

    </div>
  )
}


// 1. Make a responsive navigation bar for main page
// 2. Get a responsive profile page ready. Give some options to edit or delete the posts. Work on how to get profile picture of user using multer
// 3. Finish all the mentor, mentee endpoints
// 4. See all joined communities, click on a particular community, community profile along with posts with an option to add a community post.


// Targets to be achieved till end of May.
//1. A good frontend.
//2. AI for guidance done as well profanity (main features)
//3. Get the images vala part using multer, have an idea about it



//Pending targets for June

//1. Try to complete chat app between mentor and mentee
//2. Finish the AI part.

// Once this is achieved project will officially finished except maybe frontend modifications.

//Targets for tomorrow
// Get mainpage header and profile page ready with maximum functionalities
// OR
// Finish all mentor and mentee endpoints

//Try to have maximum functionalities in the project by end of May, and a good frontend. Host it then.


//Latest TODO list till may end
//Finish mentor and mentee registration page. After that just show them the respective pages of mentees and mentors.
//Add a button on main page that view your mentees/ view mentors once registration done.

//Profile picture, cover picture add and update.





//Final list to be done:

//Implement file upload using multer for posts, profilePicture and Coverpicture,
//Develop a good profile page so we can host it soon and chatType AI.
//Delete post endpoint

//After above two you have a good going of the project. Done
