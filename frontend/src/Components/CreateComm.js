import React, {useState} from 'react'
// import DataContext from "./Context/context"
import { useNavigate } from 'react-router-dom'
 
export default function CreateComm() {
  
  const [communities, setCommunities]= useState({communityName:"", desc:""})
  let navigate=useNavigate();
  // const{communityuser,getUser}= useContext(DataContext)

  const handleClick=async(e)=>{
    e.preventDefault()
    const {communityName, desc}=communities;
    console.log(communityName, desc)

    try{
      const response = await fetch("http://localhost:5000/api/community/createCommunity" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'auth-token':localStorage.getItem('token')
         
        },
        body:JSON.stringify({communityName, desc})
          
      } );  

      if(!response.ok)
            {
                console.log("failed to fetch")
            }
      const json=await response.json();
      console.log(json)
      if(json.success)
      {
      //redirect
      
      navigate('/mainpage')
      }
    else{
      alert("Invalid credentials")
    }
  }
  catch(error)
  {
    console.log(error)
  }


  }

  const onChange=(e)=>{
    setCommunities({...communities, [e.target.name]:e.target.value})
  }

  // useEffect(() => {
  //   if(localStorage.getItem('token'))
  //   {
  //     getUser()
  //   }
  //   else{
  //     navigate('/mainpage')
  //   }
  // }, []);


  return (
    <div>
      <div>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-lg">
      <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Create a Community</h1>
  
      <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
       Create a community to share interests with women in different fields and share knowledge.
      </p>
  
      <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handleClick}>
        <p className="text-center text-lg font-medium">Let us know about the community</p>
  
        <div>
          <label htmlFor="email" className="sr-only">Community Name</label>
  
          <div className="relative">
            <input
              type="text"
              onChange={onChange}
              name='communityName'
              value={communities.communityName}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm inBox"
              placeholder="Enter Community name"
            />
  
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <div>
          <label htmlFor="text" className="sr-only">Description</label>
  
          <div className="relative">
            <input
              type="text"
              onChange={onChange}
              name="desc"
              value={communities.desc}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm inBox"
              placeholder="Enter community description"
            />
  
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
  
        <button
          type="submit"
          className="block w-full rounded-lg px-5 py-3 text-sm font-medium bg-indigo-600 text-white loginBtn"
        >
          Create
        </button>
  
      </form>
    </div>
  </div>
    </div>
  


    </div>
  )
}
