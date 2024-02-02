"use client";
import { getAllFollowersAndFollowings, updateFollow } from "@/actions/user";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Skeleton, Typography } from "antd";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FollowButton = ({ id }) => {
  const [followed, setFollowed] = useState(false);
  const { user: currentUser } = useUser();
  const queryClient = useQueryClient();
  // const state = queryClient.getQueryDefaults(['user', currentUser?.id, 'followInfo'])
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", currentUser?.id, "followInfo"],
    queryFn: () => getAllFollowersAndFollowings(currentUser?.id),
    // 20 mins stale time
    staleTime: 1000 * 60 * 20,
  });
  // console.log(state)
  useEffect(() => {
    if (data?.followings?.includes(id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [data, setFollowed, id]);

  const { mutate } = useMutation({
    mutationFn: updateFollow,

    // onMutate: ({ type }) => {
    //   setFollowed(!followed);
    //   // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    //   // profile user
    //   queryClient.cancelQueries(["user", id, "followInfo"]);

    //   // Snapshot the previous value
    //   const snapShot = queryClient.getQueryData(["user", id, "followInfo"]);

    //   queryClient.setQueryData(["user", id, "followInfo"], (old) => {
    //     return {
    //       ...old,
    //       data: {
    //         ...old.data,
    //         followers:
    //           type === "follow"
    //             ? [...old.data.followers, { followerId: currentUser.id }]
    //             : old.data.followers.filter(
    //                 (record) => record.followerId !== currentUser.id
    //               ),
    //       },
    //     };
    //   });

    //   // Return a context object with the snapshotted value
    //   return { snapShot };
    // },

    onError: (err, variables, context) => {
      setFollowed(!followed);
      queryClient.setQueryData(["user", id, "followInfo"], context.snapShot);
      toast.error("Something wrong happened. Try again!");
      console.error("Something wrong happened. Try again!", err);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["user", id, "followInfo"]);
      // queryClient.invalidateQueries(["user", user?.id]);
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
