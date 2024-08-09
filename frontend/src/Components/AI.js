import React , {useState, useHook} from 'react'
import MainHeader from './MainHeader/MainHeader'

export default function AI() {

  const [promptmessage, setPrompt]=useState({prompt:""})
  const [content, setContent]=useState("")


  const onSubmit=async(e)=>{
    e.preventDefault()
    try{
      const res = await fetch(`http://localhost:5000/api/aiguidance/chatbot` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
         
        },
         body:JSON.stringify({ prompt: promptmessage.prompt})
          
      } );  

      if(!res.ok)
        {
          console.log("Error has occured")
        }
      const json=await res.json();
      console.log(json)
      setContent(json.response)
      
   
  }
  catch(error)
  {
    console.log(error)
  }



  }
  const onChange=(e)=>{
    setPrompt({...promptmessage, [e.target.name]:e.target.value})
  }


  return (
    
    <>
    <MainHeader/>
     
    <div className='container my-6'>
   
      <div class="mb-3">
  <label htmlFor="exampleFormControlTextarea1" className="form-label justify-center">Ask AI chatbot anything</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="prompt" onChange={onChange} value={promptmessage.prompt} ></textarea>

  <button className='btn btn-primary justify-center' onClick={onSubmit}>Submit</button>
</div>

<textarea className="form-control" id="exampleFormControlTextarea1" readOnly rows="3" name="content"  value={content} ></textarea>
    </div>
    </>
  )
}
