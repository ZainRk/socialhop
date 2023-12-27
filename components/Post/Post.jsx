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
import dayjs from "dayjs";
import { getFileTypeFromUrl } from "@/utils";
const Post = ({ data }) => {
  return (
    <div className={css.wrapper}>
      <Box>
        <div className={css.container}>
          {/* profile info */}
          <Flex gap={".5rem"} align="center">
            <Avatar size={40} src={data?.author?.image_url} />

            {/* name and post date */}
            <Flex vertical>
              <Typography className="typoSubtitle2">
                {data?.author?.first_name} {data?.author?.last_name}
              </Typography>
              <Typography.Text className="typoCaption" type="secondary" strong>
                {dayjs(data?.created_at).format("DD MMM YYYY")}
              </Typography.Text>
            </Flex>
          </Flex>

          {/* caption */}
          <Typography.Text className="typoBody2">
            <div dangerouslySetInnerHTML={{ __html: (data?.postText).replace(/\n/g, '<br/>') }}></div>
          </Typography.Text>

          {/* media */}
          {getFileTypeFromUrl(data?.media) === "image" && (
            <div className={css.media}>
              <Image
                src={data?.media}
                alt="post"
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
          )}
          {getFileTypeFromUrl(data?.media) === "video" && (
            <div className={css.media}>
              <video
                src={data?.media}
                controls
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}

          {/* actions */}
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: ".5rem 0rem" }}
          >
            {/* left side like and comment */}
            <Flex>
              <LikeButton postId={data?.id} likes={data?.likes} />
              <CommentButton comments={data?.comments?.length} />
            </Flex>

            {/* right side share */}
            <ShareButton />
          </Flex>

          {/* comments */}
          <CommentSection
            comments={data?.comments}
            expanded={false}
            postId={data?.id}
          />
        </div>
      </Box>
    </div>
  );
};

export default Post;
