"use client";
import React from "react";
import css from "@/styles/Post.module.css";
import Box from "./Box";
import { Avatar, Flex, Typography } from "antd";
const Post = () => {
  return (
    <div className={css.wrapper}>
      <Box>
        <div className={css.container}>
          {/* profile info */}
          <Flex gap={".5rem"} align="center">
            <Avatar size={40} src={"https://i.pravatar.cc/300"} />

            {/* name and post date */}
            <Flex vertical>
              <Typography className="typoSubtitle2">Jaydon Frankie</Typography>
              <Typography.Text className="typoCaption" type="secondary" strong>
                28 Nov 2023
              </Typography.Text>
            </Flex>
          </Flex>

          {/* caption */}
          <Typography.Text className="typoBody2">
            The sun slowly set over the horizon, painting the sky in vibrant
            hues of orange and pink.
          </Typography.Text>

          {/* image */}
          
        </div>
      </Box>
    </div>
  );
};

export default Post;
