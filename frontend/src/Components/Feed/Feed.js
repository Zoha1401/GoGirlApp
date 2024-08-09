// import Post from "../Post/Post";
// import {useState, useEffect} from "react"
// import "./Feed.css";


// export default function Feed( {userId} ) {
//   const [posts, setPosts] = useState([]);
//   const host = "http://localhost:5000";

//   useEffect(() => {
//     const fetchPosts = async () => {
//       console.log(userId)
//       const endpoint = userId 
//         ? `${host}/api/posts/profile/getpost` // Assuming userId is used as part of the path
//         : `${host}/api/posts/timeline/getallposts`;

//       try {
//         const response = await fetch(endpoint, {
//           method: 'GET',
//           mode: 'cors',
//           headers: {
//             'Content-Type': "application/json",
//             'auth-token': localStorage.getItem('token')
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch posts');
//         }

//         const json = await response.json();
//         const sortedPosts = json.sort((p1, p2) => {
//           return new Date(p2.createdAt) - new Date(p1.createdAt);
//         });

//         setPosts(sortedPosts);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         // Here, you might want to update the state to show an error message or similar.
//       }
//     };

//     fetchPosts();
//   }, [userId]); 
  
  

//   return (
//     <div>
//       <div className="feed">
//       <div className="feedWrapper">
   
//       {posts.length === 0 ? (
//   <p>Join a community to see and add new posts</p>
// ) : (
//   posts.map((p) => (
//     <Post key={p._id} post={p} />
//   ))
// )}
     
//       </div>
//     </div>
//     </div>
//   )
// }


import Post from "../Post/Post";
import { useState, useEffect } from "react";
import "./Feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const host = "http://localhost:5000";

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
     
      console.log("hello to get to know userId")
      const endpoint = 
        
         `${host}/api/posts/timeline/getallposts`;

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        
        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const json = await response.json();
        const sortedPosts = json.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        );
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle error, e.g., set error state
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Include userId in the dependency array

  return ( 
    <div>
      <div className="feed">
        <div className="feedWrapper">
          {loading ? (
            <p>Loading...</p>
          ) : posts.length === 0 ? (
            <p>Join a community to see and add new posts</p>
          ) : (
            posts.map((p) => <Post key={p._id} post={p} />)
          )}
        </div>
      </div>
    </div>
  );
}
