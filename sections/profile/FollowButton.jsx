"use client";
import { updateFollow } from "@/actions/user";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Skeleton, Typography } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FollowButton = ({ id, followers, isLoading, isError }) => {
  const [followed, setFollowed] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (followers?.includes(user?.id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [followers, setFollowed, id, user]);

  const { mutate } = useMutation({
    mutationFn: updateFollow,

    onMutate: ({ type }) => {
      setFollowed(!followed);
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      queryClient.cancelQueries(["user", id]);

      // Snapshot the previous value
      const snapShot = queryClient.getQueryData(["user", id]);

      queryClient.setQueryData(["user", id], (old) => {
        return {
          ...old,
          data: {
            ...old.data,
            followers:
              type === "follow"
                ? [...old.data.followers, { followerId: user.id }]
                : old.data.followers.filter(
                    (record) => record.followerId !== user.id
                  ),
          },
        };
      });

      // Return a context object with the snapshotted value
      return { snapShot };
    },

    onError: (err, variables, context) => {
      setFollowed(!followed);
      queryClient.setQueryData(["user", id], context.snapShot);
      toast.error("Something wrong happened. Try again!");
      console.error("Something wrong happened. Try again!", err);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["user", id]);
      queryClient.invalidateQueries(["user", user?.id]);
    },
  });

  if (isLoading)
    return (
      <Skeleton.Button active={true} size="large" style={{ width: "100%" }} />
    );

  if (isError)
    return <Alert message="Error while fetching data" type="error" />;

  return (
    <Button
      type="primary"
      style={{
        background: "var(--gradient)",
      }}
      onClick={() => mutate({ id, type: followed ? "unfollow" : "follow" })}
    >
      <Typography className="typoSubtitle2" style={{ color: "white" }}>
        {followed ? "Unfollow" : "Follow"}
      </Typography>
    </Button>
  );
};

export default FollowButton;
