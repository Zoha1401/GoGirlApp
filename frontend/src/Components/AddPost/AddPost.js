import React, {useState} from 'react'
import MainHeader from '../MainHeader/MainHeader';
import "./AddPost.css"
// import DataContext from "./Context/context"
import { useNavigate, useParams } from 'react-router-dom'

export default function AddPost() {
   
  const [post, setPost]= useState({ desc:""})
  const [file, setFile] = useState(null);
 

  let navigate=useNavigate();
  const {commid}= useParams()
  console.log(commid)
    const handleClick= async(e)=>{
      e.preventDefault()
      const {desc}=post;
      console.log(desc)
      // const formData = new FormData()
      // formData.append("avatar", file); 
      // formData.append("desc", desc);
      try{
      const response1 = await fetch("http://localhost:5000/api/profanitycheck/analyze-content" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      
         
        },
        body:JSON.stringify({content:desc})
          
      } );  
      console.log(response1)
      const json1=await response1.json();
      if(json1.isAbusive)
        {
         alert("This content is not proper, you cannot post this")
        }

        else{
          try{
            const response = await fetch(`http://localhost:5000/api/community/${commid}` , {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'auth-token':localStorage.getItem('token')
               
              },
              body:JSON.stringify({desc})
                
            } );  
            console.log(response)
            if(!response.ok)
                  {
                      console.log("failed to fetch")
                  }
            const json=await response.json();
            console.log(json)
            if(json)
            {
            //redirect
            
            navigate(`/communityProfile/${commid}`)
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
    }
    catch(err)
    {
      console.log("some error occured", err)
    }

     

       
     

      
  
    }
  
  
    const onChange=(e)=>{
      setPost({...post, [e.target.name]:e.target.value})
    }
  
    const onFileChange = (e) => {
      setFile(e.target.files[0]);
    };


    


  return (
    <>
     <MainHeader/>
     <div className="container">
    <div className="box my-5">
      <div class="mb-3">
  <label for="formFileMultiple" class="form-label">Add your image</label>
  <input class="form-control" type="file" id="formFileMultiple"  onChange={onFileChange}/>
</div>

<div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Enter your description here</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"  name="desc" onChange={onChange}  value={post.desc}></textarea>
</div>

<button type="button" class="btn btn-danger" onClick={handleClick}>Share post</button>
    </div>
    </div>
    </>
    
  )
}
