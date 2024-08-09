import { useState, useEffect } from "react";
import "./CommunityProfile.css";
import { useParams } from "react-router";
import CommunityFeed from "../CommunityFeed/CommunityFeed";
import JoinedComm from "../JoinedComm/JoinedComm";
import CommMembers from "../CommMembers/CommMembers";
import { Link } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";
//Community profile similar to user profile, all the community posts displayed.. Side bar will have all the buttons add community post

export default function CommunityProfile() {
  const { commid } = useParams();
  const [community, setCommunity] = useState({});

  const [members, setMembers] = useState([]);
  const host = "http://localhost:5000";

  useEffect(() => {
    const fetchCommunity = async () => {
      const response = await fetch(
        `${host}/api/community/getCommunity/${commid}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();

      setCommunity(json);
    };
    fetchCommunity();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch(
        `${host}/api/community/getCommunitymembers/${commid}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      console.log(json);
      setMembers(json);
    };
    fetchMembers();
  }, []);

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
              <h4 className="profileInfoName">{community.communityName}</h4>
              <span className="profileInfoDesc">{community.desc}</span>
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
              <li class="list-group-item">Community Members</li>
            </ul>
          </div>
          <div className="text-center">
            {members.length === 0 ? (
              <p>You have not joined communities yet</p>
            ) : (
              members.map((m) => <CommMembers key={m._id} mem={m} />)
            )}
          </div>
          <Link
            button
            type="button"
            class="btn btn-danger"
            to={`/addpost/${commid}`}
          >
            Add post
          </Link>
          </div>
        </div>

        <div className="col-8">
          <CommunityFeed />
        </div>
      </div>
    </div>
  );
}
