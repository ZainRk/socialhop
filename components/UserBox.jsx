'use client'
import React, { useEffect, useState } from "react";
import css from "@/styles/UserBox.module.css";
import Box from "./Box";
import { Avatar, Button, Flex, Typography } from "antd";
import { Icon } from "@iconify/react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFollow } from "@/actions/user";
import toast from "react-hot-toast";
const UserBox = ({ data, type, loggedInUserData }) => {
  const [followed, setFollowed] = useState(false);
  const { user: currentUser } = useUser();
  const queryClient = useQueryClient();
  const personId = data?.[type]?.id;
  // deciding the status of follow button
  useEffect(() => {
    if (
      loggedInUserData?.following
        ?.map((person) => person?.followingId)
        .includes(data?.[type === "follower" ? "followerId" : "followingId"])
    ) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [loggedInUserData, setFollowed, data, type]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateFollow,

    onError: (err, variables, context) => {
      toast.error("Something wrong happened. Try again!");
      console.error("Something wrong happened. Try again!", err);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["user", currentUser?.id, "followInfo"]);
      queryClient.invalidateQueries(["user", personId, "followInfo"]);
    },
  });

  return (
    <Box className={css.container}>
      <div className={css.left}>
        <Avatar src={data?.[type]?.image_url} size={40} />
        <div className={css.details}>
          <Typography.Text className={"typoSubtitle2"} ellipsis>
            {data?.[type]?.first_name} {data?.[type]?.last_name}
          </Typography.Text>
          <Typography.Text className={"typoCaption"} type="secondary">
            {data?.[type]?.username}
          </Typography.Text>
        </div>
      </div>

      {data?.[type]?.id === currentUser?.id ? (
        <div className={css.right}></div>
      ) : (
        <div className={css.right}>
          {!followed ? (
            <Button
              onClick={() => mutate({ id: personId, type: "follow" })}
              className={css.button}
              type="text"
              size="small"
            >
              <Typography.Text strong>
                {isPending ? "Loading..." : "Follow"}
              </Typography.Text>
            </Button>
          ) : (
            <Button
              type="text"
              size="small"
              onClick={() =>
                mutate({
                  id: personId,
                  type: "unfollow",
                })
              }
            >
              <Flex gap={10} align="center">
                <Icon icon={"charm:tick"} width={18} color="#3db66a" />
                <Typography.Text strong style={{ color: "#3db66a" }}>
                  {isPending ? "Loading..." : "Followed"}
                </Typography.Text>
              </Flex>
            </Button>
          )}
        </div>
      )}
    </Box>
  );
};

export default UserBox;
