 'use client'
import { useState, useEffect } from "react"

import { useSession } from "next-auth/react"

import Profile from "@components/Profile"

import { useParams } from "next/navigation"

const UserProfile = () => {

   const params = useParams()
    
    const {data: session} = useSession()

    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    useEffect(() => {
      if(session?.user.id){
        fetchPosts();
    }
    console.log(params)
    }, []);
  
  return (
    <Profile
      name="User"
      desc="Users Profile"
      data={posts}
    />
   
  );
}

export default UserProfile
