import { Flex } from 'antd'
import React from 'react'
import Post from './Post'

const Posts = () => {
  return (
    <Flex vertical gap={'1rem'}>
        <Post/>
    </Flex>
  )
}

export default Posts