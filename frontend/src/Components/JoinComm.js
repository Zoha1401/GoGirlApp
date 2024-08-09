import {useState, useEffect} from "react"
import Community from "./Community";

export default function JoinComm() {


  const [communities, setCommunities] = useState([]);

  const host="http://localhost:5000"

  useEffect(() => {
    const fetchCommunities = async () => {
      try{
        const response=await fetch(`${host}/api/community/notJoinedCommunities`,
        {
            method:'GET',
            mode:'cors',
            headers:{
                'Content-Type':"application/json",
                'auth-token':localStorage.getItem('token')
            }
        })
        
        if(!response.ok)
        {
            console.log("failed to fetch")
        }
        
        const json=await response.json()

        setCommunities(json);
        console.log(json);
    }
    catch(error){
        console.log("Some error has occured")
    }
  }
    fetchCommunities();
  }, []);
  
    
  return (
    <div>
      <section class="bg-gray-900 text-white">
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="mx-auto max-w-lg text-center">
      <h2 class="text-3xl font-bold sm:text-4xl">Welcome to Community section of GO GIRL</h2>

      <p class="mt-4 text-gray-300">
        Join different communities to interact and seek mentorship from women excelling in their domains. Enhance your skills and support women all around the globe
      </p>
    </div>
    </div>
    
    <div className="container">
    {communities.map((c) => (
          <Community key={c._id} comm={c} />
        ))}
    </div>
</section>
    </div>
  )
}
