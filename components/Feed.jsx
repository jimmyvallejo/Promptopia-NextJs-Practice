'use client'

import { useState, useEffect } from "react"

import { PromptCard } from "./PromptCard"

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";




const PromptCardList = ({ posts, handleTagClick }) => {
  
    const { data: session } = useSession();

    const router = useRouter()

  return (
    <div className="mt-16 prompt_layout">
      {posts.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};






const Feed = () => {
  
  const [searchText, setsearchText] = useState("")
  const [posts, setPosts] = useState([])
  const [displayedPosts, setDisplayedPosts] = useState([])

  useEffect(() => {
    console.log(posts);
  },[]);


const fetchPosts = async () => {
  const response = await fetch("/api/prompt");
  const data = await response.json();
   await console.log(data)
  setPosts(data);
  setDisplayedPosts(data)
};

useEffect(() => {
  fetchPosts();
}, []);

useEffect(() => {
  
  let lowerCase = searchText.toLowerCase()
  
  let filtered = posts.filter((elem) => {
    console.log(elem)
    if (elem.creator.email.toLowerCase().includes(lowerCase) || elem.prompt.toLowerCase().includes(lowerCase) || elem.tag.toLowerCase().includes(lowerCase) ) {
      return true;
    }
    return false;
  });
  

  setTimeout(() => {
   setDisplayedPosts(filtered);
}, "700");
}, [searchText, posts]);




const handleTagClick = (elem) => {
  setsearchText(elem)
} 


  return (
    <section className="feed">
       <form className="relative w-full flex-center">
        <input
        type="text"
        placeholder="Search for prompts"
        value={searchText}
        onChange={(e) => setsearchText(e.target.value)}
        required
        className="search_input peer"
        />
       </form>
       <PromptCardList posts={displayedPosts} handleTagClick={handleTagClick} />
      </section>
  )
}

export default Feed