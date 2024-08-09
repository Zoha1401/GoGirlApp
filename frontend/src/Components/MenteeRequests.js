import Request from './Request';
import MainHeader from './MainHeader/MainHeader'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"; 

export default function MenteeRequests() {
    const [mentees, setmentees] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const host = 'http://localhost:5000';
  
    useEffect(() => {
      const fetchRequests = async () => {
        setLoading(true);
        console.log("1")
        try {
          const response = await fetch(`${host}/api/mentor/fetchrequests`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token"),
            },
          });  
  
        
          if (!response.ok) {
            console.log("Error in fetching mentees")
          }
          const json = await response.json();
          console.log(json)
          setmentees(json);
        } catch (error) {
          console.error('Error fetching mentors:', error);
         
        } finally {
          setLoading(false);
        }
      };
      fetchRequests();
    }, []);
  
    return (
      <div>
        <MainHeader/>
        <div className="container">Accept connection requests</div>
        {loading ? (
          <p>Loading...</p>
        ) 
         : mentees.length === 0 ? (
          <p>No connection requests found</p>
        ) : (
          mentees.map((m) => <Request key={m._id} requested_mentee={m} />)
        )}
       
        </div>
        )}