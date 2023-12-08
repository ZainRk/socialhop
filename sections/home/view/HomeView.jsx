import React from 'react'
import css from '@/styles/Home.module.css'
import PostGenerator from '@/components/PostGenerator'
import Posts from '@/components/Posts'
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
        Right side
      </div>
    </div>
  )
}

export default HomeView