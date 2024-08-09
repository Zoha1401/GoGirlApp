import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import MainHeader from './MainHeader/MainHeader'
import Mentor from './Mentor';

export default function PersonalMentors() {
  const [mentors, setmentors] = useState([]);
  const [othermentors, setothermentors] = useState([]);
  const [loading, setLoading] = useState(false);

  const host = 'http://localhost:5000';

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      console.log("1")
      try {
        const response = await fetch(`${host}/api/mentee/fetchyourmentors`, {
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

  useEffect(() => {
    const fetchOMentors = async () => {
      setLoading(true);
      console.log("1")
      try {
        const response = await fetch(`${host}/api/mentee/fetchothermentors`, {
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
        setothermentors(json);
      } catch (error) {
        console.error('Error fetching mentors:', error);
       
      } finally {
        setLoading(false);
      }
    };
    fetchOMentors();
  }, []);

  return (
    <>
      <MainHeader/>
      <div className="row">
        <div className='col-4'>
          <div className='leftColumn'>
            <div className='mentorContent'>
             <span style={{ color: "#6636C9",display: "block", marginTop: "-180px"}}>Your Mentors</span>
             {loading ? (
    <p>Loading...</p>
  ) : mentors.length === 0 ? (
    <p>No mentors found</p>
  ) : (
    mentors.map((m) => <Mentor key={m._id} mentor={m} />)
  )}
              
            </div>
            
          </div>
          
        </div>
        <div className='col-8'>
          <div className='rightColumn'>
            <div className='menteeContent'>
              <div className="mentHeading"><span style={{ color: "#6636C9",display: "block", marginTop: "-180px" }}>View other mentors</span></div>
             
              {loading ? (
    <p>Loading...</p>
  ) : othermentors.length === 0 ? (
    <p>No mentors found</p>
  ) : (
    othermentors.map((m) => <Mentor key={m._id} mentor={m} />)
  )}
         
            </div>
          </div>
        </div>
      </div>
  
    </>
  )
}
