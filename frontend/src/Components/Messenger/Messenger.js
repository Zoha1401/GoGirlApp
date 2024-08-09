import React, {useState, useEffect,useRef} from 'react'
import MainHeader from "../MainHeader/MainHeader";
import "./Messenger.css"
import Message from '../Message.js/Message';
import Conversation from '../Conversation/Conversation';
import ChatOnline from '../chatOnline/chatOnline';
import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom'


export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef=useRef()
  const [user, setUser] = useState({});
  let navigate=useNavigate();
  const host = "http://localhost:5000";
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${host}/api/users/getUserbyauthtoken`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
             "auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
     
       
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., set default user data
      }
    };

    fetchUser();
  }, []);


  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch(`${host}/api/conversations/${user._id}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user conv");
        }

        const data = await response.json();

     
       
       
        setConversations(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., set default user data
      }
    };

    fetchConversation();
  }, [user._id]);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${host}/api/messages/${currentChat?._id}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user conv");
        }

        const data = await response.json();

     
       
       
        setMessages(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., set default user data
      }
    };

    fetchMessages();
  }, [currentChat]);

  const onChange=(e)=>{
    setNewMessage(e.target.value);
  }





const handleSubmit=async(e)=>{

  e.preventDefault()

  

  try{
    const response = await fetch(`${host}/api/messages/addnewmessage/${currentChat._id}` , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token':localStorage.getItem('token')
       
      },
      body:JSON.stringify({ 
        text:newMessage})
        
    } );  
    console.log(response)
    if(!response.ok)
          {
              console.log("failed to fetch")
          }
    const json=await response.json();
    console.log(json)
  
    
    if(json.success)
    {
    //redirect
    setMessages([...messages, json.savedMessage]);
    setNewMessage("");
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

useEffect(() => {
  scrollRef.current?.scrollIntoView({behavior:"smooth"})
}, [messages]);

  

    
  return (
    <div>
      <MainHeader/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
           {conversations.map((c)=>(
            <div onClick={()=>setCurrentChat(c)}>
            <Conversation conversation={c} currentUser={user}/>
            </div>
           ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
                {
                  currentChat?

                  <>
              
          <div className="chatBoxTop">
                 
             {messages.map(m=>(
              <div ref={scrollRef}>

              <Message message={m} own={user._id===m.sender}/>
              </div>
           
             ))}
                 </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    name="newMessage"
                    value={newMessage}
                    onChange={onChange}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>  
            
          </div> </> :<span className='noConversationText'>Open Conversation to start a chat</span>}
        </div>
        
      </div>
      </div>
      </div>
   
  )
}
