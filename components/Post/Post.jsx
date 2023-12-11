"use client";
import React from "react";
import css from "@/styles/Post.module.css";
import Box from "../Box";
import { Avatar, Flex, Typography } from "antd";
import Image from "next/image";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ShareButton from "./ShareButton";
import CommentSection from "./CommentSection";
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

          {/* media */}
          <div className={css.media}>
            <Image
              src="/images/post1.jpg"
              alt="post"
              style={{ objectFit: "cover" }}
              fill
            />
          </div>

          {/* actions */}
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: ".5rem 0rem" }}
          >
            {/* left side like and comment */}
            <Flex>
              <LikeButton />
              <CommentButton />
            </Flex>

            {/* right side share */}
            <ShareButton />
          </Flex>

          {/* comments */}
          <CommentSection />
        </div>
      </Box>
    </div>
  );
};

export default Post;
