'use client'

import { useState, useEffect } from "react"

import { PromptCard } from "./PromptCard"



const PromptCardList = ({ posts, handleTagClick }) => {
  

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


  const handleSearchChange = (e) => {
 
  }

const fetchPosts = async () => {
  const response = await fetch("/api/prompt");
  const data = await response.json();

  setPosts(data);
};

useEffect(() => {
  fetchPosts();
}, []);


  return (
    <section className="feed">
       <form className="relative w-full flex-center">
        <input
        type="text"
        placeholder="Search for prompts"
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
        />
       </form>
       <PromptCardList posts={posts} handleTagClick={() => {}} />
      </section>
  )
}

export default Feed