import React from 'react'
import MainHeader from './MainHeader/MainHeader'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"; 
import Mentee from "./Mentee"
import YourMentee from './YourMentee';
import {useNavigate} from "react-router-dom"

export default function PersonalMentees() {
    const [mentees, setmentees] = useState([]);
    const [loading, setLoading] = useState(false);
    let navigate=useNavigate()
    const host = 'http://localhost:5000';
  
    useEffect(() => {
      const fetchMentees = async () => {
        setLoading(true);
        console.log("1")
        try {
          const response = await fetch(`${host}/api/mentor/fetchmentees`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token"),
            },
          });  
  
        
          if (!response.ok) {
            console.log("Error in fetching mentees")
            alert("Register as mentor first")
             navigate("/mentorship")
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
      fetchMentees();
    }, []);
  
    return (
      <div>
        <MainHeader/>
        <div className="container">These mentees are under you</div>
        {loading ? (
          <p>Loading...</p>
        ) 
         : mentees.length === 0 ? (
          <p>No mentees found</p>
        ) : (
          mentees.map((m) => <YourMentee key={m._id} mentee={m} />)
        )}
       
        </div>
        )}