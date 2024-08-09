import React, { useState, useEffect } from "react";
import "./Profile.css";
import Post from "../Post/Post";
import Community from "../Community";
import JoinedComm from "../JoinedComm/JoinedComm";
import ProfileFeed from "../ProfileFeed/ProfileFeed";
import { Link, resolvePath, useParams } from "react-router-dom";
import Feed from "../Feed/Feed";
import MainHeader from "../MainHeader/MainHeader";

export default function Profile() {
  const [user, setUser] = useState({});
  const [communities, setCommunities] = useState([]);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();
  const host = "http://localhost:5000";

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${host}/api/users/getUser/${userId}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("3");
      console.log(response);
      console.log("4");
      const json = await response.json();
      setUser(json);
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchCommunities = async () => {
      const response = await fetch(
        `${host}/api/community/joinedCommunitiesbyId/${userId}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const json = await response.json();
      console.log("1");
      console.log(json);
      console.log("2");
      setCommunities(json);
    };
    fetchCommunities();
  }, [userId]);

  return (
    <div>
    <MainHeader/>
    <div className="profile">
      {/* <div className='col-4'><Sidebar /></div> */}
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              src={"/img/photo-1440114071841-493f350845eb.jpeg"}
              alt=""
            />
            <img
              className="profileUserImg"
              src="/img/profile-user.png"
              alt=""
            />
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.name}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
          </div>
        </div>
        <div className="profileRightBottom">
          <div className="container"></div>
        </div>
      </div>
    </div>

    <div className="row">
      <div className='col-4'>
        <div className='leftColumn'>
        <div class="card text-center">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Joined Communities</li>
          </ul>
        </div>
        <div className="text-center">
        {communities.length === 0 ? (
                <p>You have not joined communities yet</p>
              ) : (
                communities.map((c) => <JoinedComm key={c._id} comm={c} />)
              )}
        </div>
       
        </div>
      </div>

      <div className="col-8">
      <ProfileFeed userId={user._id} />
      </div>
    </div>
  </div>
    
  );
}
