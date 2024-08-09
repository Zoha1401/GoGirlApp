import React from 'react'
import Rightbar from './Rightbar/Rightbar'
import Feed from './Feed/Feed'
import Sidebar from './Sidebar/Sidebar'
import MainHeader from './MainHeader/MainHeader'

export default function MainPage() {

  const mystyle={
    width: "100%",
    marginRight: "0px",
    marginLeft: "0px"
}
  return (
    <div>
     
            <MainHeader/>
                <div className='row'>
                    <div className='col-4'><Sidebar/></div>
                    <div className='col-6'><Feed/></div>
                    <div className='col-2'><Rightbar /></div> 
                 
                </div>
    </div>
  )
}
