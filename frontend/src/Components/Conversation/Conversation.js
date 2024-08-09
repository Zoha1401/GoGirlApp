import React, {useState, useEffect} from 'react'
import "./Conversation.css";

export default function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null);
  
  const host = "http://localhost:5000";

  useEffect(() => {
    

    const userId = conversation.members.find(m => m !== currentUser._id);

    const getUser = async () => {
      try {
        const response = await fetch(`${host}/api/users/getUser/${userId}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
       
      }
    };
    getUser();
  }, [conversation, currentUser, host]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.profilePicture || '/img/profile-user.png'}
        
      />
      <span className="conversationName">{user?.name || 'Unknown User'}</span>
      
    </div>
  );
}
