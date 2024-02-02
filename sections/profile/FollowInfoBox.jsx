import Box from "@/components/Box";
import React from "react";
import css from "@/styles/FollowInfoBox.module.css";
import { Alert, Skeleton, Space, Typography } from "antd";
const FollowInfoBox = ({
  isLoading,
  isError,
  followers = 0,
  followings = 0,
}) => {
  if (isLoading)
    return (
      <Skeleton.Button active={true} size="large" style={{ width: "100%" }} />
    );

  if (isError)
    return <Alert message="Error while fetching data" type="error" />;

  return (
    <Box className={css.container}>
      <Space direction="vertical" align="center">
        <Typography className={"typoH5"}>{followers}</Typography>
        <Typography className={"typoSubtitle2"}>Followers</Typography>
      </Space>

      <Space direction="vertical" align="center">
        <Typography className={"typoH5"}>{followings}</Typography>
        <Typography className={"typoSubtitle2"}>Followings</Typography>
      </Space>
    </Box>
  );
};

export default FollowInfoBox;
