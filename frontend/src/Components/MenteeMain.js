import React, {useState, useEffect} from 'react'
import Mentor from './Mentor';
import MainHeader from './MainHeader/MainHeader'


export default function MenteeMain() {
  const [mentors, setmentors] = useState([]);
  const [loading, setLoading] = useState(false);

  const host = 'http://localhost:5000';

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      console.log("1")
      try {
        const response = await fetch(`${host}/api/mentor/getallmentors`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token"),
          },
        });  

      
        if (!response.ok) {
          console.log("Error in fetching mentors")
        }
        const json = await response.json();
        console.log(json)
        setmentors(json);
      } catch (error) {
        console.error('Error fetching mentors:', error);
       
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  return (
    <div>
      <MainHeader/>
      <div className="container">Connect with mentor to learn from them</div>
      {loading ? (
        <p>Loading...</p>
      ) 
       : mentors.length === 0 ? (
        <p>No mentors found</p>
      ) : (
        mentors.map((m) => <Mentor key={m._id} mentor={m} />)
      )}
    </div>
  );
}
