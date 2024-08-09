// import { useState, useEffect } from "react";

// import {format} from "timeago.js"
// import {Link} from "react-router-dom";
// import "./Post.css";

// export default function Post({post}) {
//   const host="http://localhost:5000"

//   const [like,setLike] = useState(post.likes.length)
//   const [isLiked,setIsLiked] = useState(false)
//   const [user, setUser]=useState({})

//   useEffect( ()=>{
//     const fetchUser=async()=>{
      


//       const response=await fetch(`${host}/api/users/${post.userId}`,
//         {
//             method:'GET',
//             mode:'cors',
//             headers:{
//                 'Content-Type':"application/json",
//             }
//         })
        
//         setUser(response)
//     }
//     fetchUser()



//   },[post.userId])

  
//   const likeHandler =()=>{
//     setLike(isLiked ? like-1 : like+1)
//     setIsLiked(!isLiked)
//   }

//   return (
//     <div>
//       <div className="post">
//       <div className="postWrapper">
//         <div className="postTop">
//           <div className="postTopLeft">
//            <Link to='/'>
//            <img
//               className="postProfileImg"
//               src={user.profilePicture || "img/photo-1613419869237-3821370c9450.jpeg"}
//               alt=""
//             />
//             </Link>
//             <span className="postUsername">
//               {user.name}
//             </span>
//             <span className="postDate">{format(post.createdAt)}</span> 
//             {/* {format(post.createdAt)} */}
//           </div>
//           <div className="postTopRight">
          
//           </div>
//         </div>
//         <div className="postCenter">
//           <span className="postText">{post?.desc}</span>
//           <img className="postImg" src={post.img || "img/photo-1613419869237-3821370c9450.jpeg"} alt="" />
//         </div>
//         <div className="postBottom">
//           <div className="postBottomLeft">
//             <img className="likeIcon" src="img/likeIcon.png" onClick={likeHandler} alt="" />
//             <span className="postLikeCounter">{like} people like it</span>
//           </div>
//           <div className="postBottomRight">
//             <span className="postCommentText">{post.comment} comments</span>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }


import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./YourPost.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

export default function YourPost({ post }) {
  const host = "http://localhost:5000";

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  
  const handleDelete=async()=>{
    try {
        const response = await fetch(`${host}/api/posts/deletepost/${post._id}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            'auth-token':localStorage.getItem('token')
          },
        });

        if (!response.ok) {
          throw new Error("Failed");
        }

        const json=response.json()
        console.log(json)
        
                alert("Post deleted successfully")
                window.location.reload();
            
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., set default user data
      }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${host}/api/users/getUser/${post.userId}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
       
       
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., set default user data
      }
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = async() => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    try {
        const response = await fetch(`${host}/api/posts/${post._id}/like`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            'auth-token':localStorage.getItem('token')
          },
        });

        if (!response.ok) {
          throw new Error("Failed");
        }

        const json=response.json()
        console.log(json)
        
                
                
            
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, e.g., set default user data
      }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user._id}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture || "/img/profile-user.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.name}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight"><button onClick={handleDelete}>Delete</button></div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img || "/img/photo-1613419869237-3821370c9450.jpeg"} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
          <div className="likeIcon" onClick={likeHandler}><FavoriteIcon/></div>
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} <CommentIcon/></span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
