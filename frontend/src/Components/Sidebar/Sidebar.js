import React from 'react'
import "./Sidebar.css"
import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='buttonWrapper'>
                    <div className='buttonBox'>
                        <div className='buttonItems'>
                            <span className='createIcon'>
                                <ion-icon name="add-circle-outline"></ion-icon>
                            </span>
                            <Link to='/createCommunity' className='commButton'>Create community</Link>
                        </div>
                        <span className='textBelowBtn'>Create a new community for women having similar interests as yourself</span>
                    </div>
                    <div className='buttonBox'>
                        <div className='buttonItems'>
                            <span className='createIcon'>
                                <ion-icon name="add-circle-outline"></ion-icon>
                            </span>
                            <Link to='/joinCommunity' className='commButton'>Join community</Link>
                          </div>
                        <span className='textBelowBtn'>Join a community and connect with women having similar interests as yourself</span>
                    </div>
                </div>
                <hr className='hrSidebar'/>
                <div className='buttonBox'>
                    <div className='buttonItemss'>
                       <div className="commButton text-center">Your Communities</div>
                       </div>
                       </div>
                <hr className="sidebarHr" />
            </div>
        </div>
  )
}
