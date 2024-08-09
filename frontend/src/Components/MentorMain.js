import React, { useEffect, useState } from 'react';
import Mentee from './Mentee';


//Gets all mentees of the given mentor else show let mentee connect
export default function MentorMain() {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(false);

  const host = 'http://localhost:5000';

  useEffect(() => {
    const fetchMentees = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${host}/api/mentee/fetchmentees`, {
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
        setMentees(json);
      } catch (error) {
        console.error('Error fetching mentees:', error);
       
      } finally {
        setLoading(false);
      }
    };
    fetchMentees();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) 
       : mentees.length === 0 ? (
        <p>No mentees found</p>
      ) : (
        mentees.map((m) => <Mentee key={m._id} mentee={m} />)
      )}
    </div>
  );
}
