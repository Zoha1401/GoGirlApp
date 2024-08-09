import React, {useState, useEffect} from 'react'
import Post from '../Post/Post';
import "./ProfileFeed.css"
import YourPost from '../YourPost/YourPost';

export default function ProfileFeed({userId}) {
  console.log(userId)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const host = "http://localhost:5000";
  
    useEffect(() => { 
      const fetchPosts = async () => {
        setLoading(true);
       
        console.log("hello to get to know userId")
        const endpoint =  
          
           `${host}/api/posts/profile/getpost/${userId}`;
  
        try {
          const response = await fetch(endpoint, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
             
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
    }, [userId]); // Include userId in the dependency array
  
    return ( 
      <div>
        <div className="feed">
          <div className="feedWrapper">
            {loading ? (
              <p>Loading...</p>
            ) : posts.length === 0 ? (
              <p>You have no posts</p>
            ) : (
              posts.map((p) => <Post key={p._id} post={p} />)
            )}
          </div>
        </div>
      </div>
    )
}
