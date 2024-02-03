import React, { useEffect, useState } from "react";
import css from "@/styles/UserBox.module.css";
import Box from "./Box";
import { Avatar, Button, Flex, Typography } from "antd";
import { Icon } from "@iconify/react";
import { useUser } from "@clerk/nextjs";
const UserBox = ({ data, type, loggedInUserData }) => {
  const [followed, setFollowed] = useState(false);
  const { user: currentUser } = useUser();

  // deciding the status of follow button
  useEffect(() => {
    if (
      loggedInUserData?.following
      ?.map((person) => person?.followingId)
      .includes(data?.followingId)
    ) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [loggedInUserData, setFollowed, data]);

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
            <Button className={css.button} type="text" size="small">
              <Typography.Text strong>Follow</Typography.Text>
            </Button>
          ) : (
            <Button type="text" size="small">
              <Flex gap={10} align="center">
                <Icon icon={"charm:tick"} width={18} color="#3db66a" />
                <Typography.Text strong style={{ color: "#3db66a" }}>
                  Followed
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
