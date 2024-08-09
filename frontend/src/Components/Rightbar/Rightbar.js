import React from 'react'
import { Link } from "react-router-dom"
import './Rightbar.css'

export default function Rightbar() {
  return (
    <div className='rightbarStyle'>
    <div className='buttonBox'>
        <div className='buttonItems'>
            <span className='createIcon'>
                <ion-icon name="add-circle-outline"></ion-icon>
            </span>
            <Link to='/mentorship' className='commButton'>Mentorship Portal</Link>
        </div>
    </div>
    <div className='buttonBox'>
        <div className='buttonItems'>
            <span className='createIcon'>
                <ion-icon name="add-circle-outline"></ion-icon>
            </span>
            <Link to='/ai' className='commButton'>AI for guidance</Link>
        </div>
    </div>

    <div className='buttonBox'>
        <div className='buttonItems'>
            <span className='createIcon'>
                <ion-icon name="add-circle-outline"></ion-icon>
            </span>
            <Link to='/personalmenteepage' className='commButton'>View your mentees</Link>
        </div>
    </div>

    <div className='buttonBox'>
        <div className='buttonItems'>
            <span className='createIcon'>
                <ion-icon name="add-circle-outline"></ion-icon>
            </span>
            <Link to='/personalmentorpage' className='commButton'>View mentors</Link>
        </div>
    </div>

    <div className='buttonBox'>
        <div className='buttonItems'>
            <span className='createIcon'>
                <ion-icon name="add-circle-outline"></ion-icon>
            </span>
            <Link to='/myconnectionrequests' className='commButton'>View your connection requests</Link>
        </div>
    </div>
</div>
  )
}
