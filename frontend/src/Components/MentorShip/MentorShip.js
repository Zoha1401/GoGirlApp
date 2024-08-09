import React from 'react'
import './MentorShip.css'
import {Link} from 'react-router-dom'
import MainHeader from '../MainHeader/MainHeader'

export default function MentorShip() {
  return (
    <>
      <MainHeader/>
      <div className="row">
        <div className='col-6'>
          <div className='leftColumn'>
            <div className='mentorContent'>
              <div className='mentHeading'>For <span style={{ color: "#6636C9" }}>Mentors</span></div>
              <span className='mentWhy'>Are you a passionate woman excelling in your career? Help younger women achieve such feat by being their mentor!</span>
              <Link to='/mentorRegistrationPage'><button className='mentButton'>
                Register as a Mentor
              </button></Link>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already Registered as Mentor?
                  <Link to="/personalmenteepage" class="text-gray-700 underline">View your mentees</Link>.
                </p>
              </div>
            </div>
            
          </div>
          
        </div>
        <div className='col-6'>
          <div className='rightColumn'>
            <div className='menteeContent'>
              <div className="mentHeading"> For <span style={{ color: "#6636C9" }}>Mentees</span></div>
              <span className='mentWhy'>Are you a student or a youngster starting out in your career? Take a step towards success by talking to a mentor!</span>
              <Link to='/menteeRegistrationPage'><button className='mentButton'>
                Register as a Mentee
              </button></Link> 
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already Registered as Mentee?
                  <Link to="/personalmentorpage" class="text-gray-700 underline">View other mentors</Link>.
                </p>
              </div>             
            </div>
          </div>
        </div>
      </div>
  
    </>
  )
}
