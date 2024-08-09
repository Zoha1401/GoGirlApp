import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import MainPage from './Components/MainPage';
import MentorShip from './Components/MentorShip/MentorShip';
import Mentor from './Components/Mentor';
import Mentee from './Components/Mentee';
import CreateComm from './Components/CreateComm';
import JoinComm from './Components/JoinComm';
import Profile from './Components/Profile/Profile';
import CommunityProfile from './Components/CommunityProfile/CommunityProfile';
import AddPost from './Components/AddPost/AddPost';
import AI from './Components/AI';
import MenteeMain from './Components/MenteeMain';

import MentorMain from './Components/MentorMain';
import MentorRegistationPage from './Components/MentorRegistationPage';
import MenteeRegistrationPage from './Components/MenteeRegistrationPage';
import PersonalMentees from './Components/PersonalMentees';
import PersonalMentors from './Components/PersonalMentors';
import MenteeRequests from './Components/MenteeRequests';
import YourProfile from './Components/YourProfile/YourProfile';
import Messenger from './Components/Messenger/Messenger';
// import Home from './Components/Home';
// import Home from './Components/Home';

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>

    },
    {
      path:'/login',
      element:<Login/>

    },
    {
      path:'/signup',
      element:<Signup/>

    },
    {
      path:'/mainpage',
      element:<MainPage/>

    },
    {
      path:'/mentorship',
      element:<MentorShip/>

    },
    {
      path:'/ai',
      element:<AI/>

    },
    {
      path:'/mentormainpage',
      element:<MentorMain/>

    },
    {
      path:'/mentorRegistrationPage',
      element:<MentorRegistationPage/>

    },
    {
      path:'/menteeRegistrationPage',
      element:<MenteeRegistrationPage/>

    },
    {
      path:'/menteemainpage',
      element:<MenteeMain/>

    },
    {
      path:'/createCommunity',
      element:<CreateComm/>

    },
    {
      path:'/joinCommunity',
      element:<JoinComm/>

    },

    {
      path:'/profile/:userId',
      element:<Profile/>
    },

    {
      path:'/yourprofile/:userId',
      element:<YourProfile/>
    },

    {
      path:'/addpost/:commid',
      element:<AddPost/>
    },

    {
      path:'/communityProfile/:commid',
      element:<CommunityProfile/>
    },

    {
      path:'/personalmenteepage',
      element:<PersonalMentees/>
    },

    {
      path:'/personalmentorpage',
      element:<PersonalMentors/>
    },
    
    {
      path:'/myconnectionrequests',
      element:<MenteeRequests/>
    },

    {
      path:'/message',
      element:<Messenger/>
    },
    
  ])
  return (
    <>
    <RouterProvider router={router}/></>
  );
}

export default App;
