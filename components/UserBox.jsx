import React, { useEffect, useState } from "react";
import css from "@/styles/UserBox.module.css";
import Box from "./Box";
import { Avatar, Button, Flex, Typography } from "antd";
import { Icon } from "@iconify/react";
const UserBox = ({ data, loggedInUserData }) => {
  const [followed, setFollowed] = useState(true);
  console.log(data);
  // deciding the status of follow button
  useEffect(() => {
    if (
      loggedInUserData?.following
        ?.map((person) => person?.followingId)
        .includes(data?.id)
    ) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [loggedInUserData, setFollowed, data]);

  return (
    <Box className={css.container}>
      <div className={css.left}>
        <Avatar src={`/images/avatar2.png`} size={40} />
        <div className={css.details}>
          <Typography.Text className={"typoSubtitle2"}>
            {data?.follower?.first_name} {data?.follower?.last_name}
          </Typography.Text>
          <Typography.Text className={"typoCaption"} type="secondary">
            {data?.follower?.username}
          </Typography.Text>
        </div>
      </div>

      <div className={css.right}>
        {!followed && (
          <Button className={css.button} type="text" size="small">
            <Typography.Text strong>Follow</Typography.Text>
          </Button>
        )}
        {followed && (
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
    </Box>
  );
};

export default UserBox;
