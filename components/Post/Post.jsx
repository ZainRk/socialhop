"use client";
import React from "react";
import css from "@/styles/Post.module.css";
import Box from "../Box";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Image,
  Popconfirm,
  Typography,
} from "antd";
// import Image from "next/image";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import CommentSection from "./CommentSection";
import dayjs from "dayjs";
import { getFileTypeFromUrl } from "@/utils";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Iconify from "../Iconify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/actions/post";
const Post = ({ data, queryId }) => {
  const { user: currentUser } = useUser();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deletePost(data?.id),

    // This function will be run just before the mutation function
    onMutate: async () => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["posts", queryId]);

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(["posts", queryId]);

      // Optimistically update to the new value
      queryClient.setQueryData(["posts", queryId], (old) => {
        console.log(old);
        return {
          ...old,
          pages: old.pages.map((page) => {
            return {
              ...page,
              data: page.data.filter((post) => post.id !== data?.id),
            };
          }),
        };
      });

      // Return a context object with the snapshotted value
      return { previousPosts };
    },
    onError: (err, variables, context) => {
      console.log("this is error", err);
      queryClient.setQueryData(["posts"], context.previousPosts);
    },

    // // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const items = [
    {
      key: "1",
      danger: true,
      label: (
        <Popconfirm
          title="Delete the post"
          description="Are you sure to delete this post?"
          onConfirm={mutate}
        >
          Delete
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className={css.wrapper}>
      <Box>
        <div className={css.container}>
          {/* profile info */}
          <Flex align="center" justify="space-between">
            <Flex gap={".5rem"} align="center">
              <Link
                href={`/profile/${data?.author?.id}?person=${data?.author?.first_name}`}
                passHref
              >
                <Avatar
                  size={40}
                  src={
                    currentUser?.id === data?.authorId
                      ? currentUser?.imageUrl
                      : data?.author?.image_url
                  }
                />
              </Link>

              {/* name and post date */}
              <Flex vertical>
                <Link
                  href={`/profile/${data?.author?.id}?person=${data?.author?.first_name}`}
                  passHref
                >
                  <Typography className="typoSubtitle2">
                    {data?.author?.first_name} {data?.author?.last_name}
                  </Typography>
                </Link>
                <Typography.Text
                  className="typoCaption"
                  type="secondary"
                  strong
                >
                  {dayjs(data?.created_at).format("DD MMM YYYY")}
                </Typography.Text>
              </Flex>
            </Flex>

            {data?.authorId === currentUser?.id && (
              <Dropdown menu={{ items }} trigger={"click"}>
                <Button ghost shape="circle">
                  <Typography>
                    <Iconify icon="akar-icons:more-vertical" width={20} />
                  </Typography>
                </Button>
              </Dropdown>
            )}
          </Flex>

          {/* caption */}
          <Typography.Text className="typoBody2">
            <div
              dangerouslySetInnerHTML={{
                __html: (data?.postText)?.replace(/\n/g, "<br/>"),
              }}
            ></div>
          </Typography.Text>

          {/* media */}
          {getFileTypeFromUrl(data?.media) === "image" && (
            <div className={css.media}>
              <Image
                preview={{ mask: null }}
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
              <LikeButton
                postId={data?.id}
                likes={data?.likes}
                queryId={queryId}
              />
              <CommentButton comments={data?.comments?.length} />
            </Flex>

            {/* right side share */}
            {/* <ShareButton /> */}
          </Flex>

          {/* comments */}
          <CommentSection
            comments={data?.comments}
            expanded={false}
            postId={data?.id}
            queryId={queryId}
          />
        </div>
      </Box>
    </div>
  );
};

export default Post;
