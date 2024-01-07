"use client";
import { Button, Flex, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Iconify from "../Iconify";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useUser } from "@clerk/nextjs";
import { updatePostLike } from "@/actions/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQueryCacheLikes } from "@/utils";

const LikeButton = ({ postId, likes, queryId }) => {
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likes?.some((like) => like?.authorId === user?.id));
  }, [user, likes]);

  const actionType = isLiked ? "unlike" : "like";

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (postId, actionType) => updatePostLike(postId, actionType),

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
              data: page.data.map((post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    likes: updateQueryCacheLikes(
                      post.likes,
                      postId,
                      user.id,
                      actionType
                    ),
                  };
                } else {
                  return post;
                }
              }),
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

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return (
    <HappyProvider>
      <Button
        size="small"
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
        onClick={() => {
          mutate(postId, actionType);
        }}
      >
        <Flex gap={".5rem"} align="center">
          <Iconify
            icon="ph:heart-fill"
            width={"22px"}
            style={{ color: isLiked ? "var(--primary)" : "grey" }}
          />

          <Typography.Text className="typoBody2">
            {likes?.length === 0 ? "Like" : `${likes?.length} Likes`}
          </Typography.Text>
        </Flex>
      </Button>
    </HappyProvider>
  );
};

export default LikeButton;
