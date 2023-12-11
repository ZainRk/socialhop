// 'use client'
import React from 'react'
import css from '@/styles/Home.module.css'
import PostGenerator from '@/components/Post/PostGenerator'
import Posts from '@/components/Post/Posts'
import PopularTrends from '@/components/PopularTrends'
import FriendsSuggestion from '@/components/FriendsSuggestion'
const HomeView = () => {
  return (
    <div className={css.wrapper}>
      
      <div className={css.postsArea}> 
        {/* post generator on top */}
        <PostGenerator/>

        {/* posts */}
        <Posts/>
      </div>

      <div className={css.rightSide}>
        <PopularTrends/>

        <FriendsSuggestion/>
      </div>
    </div>
  )
}

export default HomeView