import React from 'react'
import { Link} from 'react-router-dom'
import './Header.css'
export default function Header () {
//   let navigate=useNavigate()
//   const handleLogout=()=>{
//     localStorage.removeItem('token')
//     navigate("/")
//   }

  const GoGirlStyle={
    fontSize: "24px",
  }
  return (
    <>
      <div className='navbarStart'>
      <Link className='navbarStartLinks' to='/'><b><span style={GoGirlStyle}>GoGirl</span></b></Link>
        <Link className='navbarStartLinks' to='/'>Home</Link>
        <Link className='navbarStartLinks' to='/about'>About</Link>
        <div>
        <Link className='navbarStartLinks' to='/login'>Login</Link>
        <Link className='navbarStartLinks' to='/signup'>Signup</Link>
        </div>
        {/* <Link className='navbarStartLinks' to='/mainpage'>Mainpage</Link> */}
        {/* <Link className='navbarStartLinks' to='/profile'>Profile</Link> */}
      </div>
    </>
  )
}
