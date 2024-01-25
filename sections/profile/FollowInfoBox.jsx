import Box from "@/components/Box";
import React from "react";
import css from "@/styles/FollowInfoBox.module.css";
import { Space, Typography } from "antd";
const FollowInfoBox = ({ followers = [], followings = [] }) => {
  return (
    <Box className={css.container}>
      <Space direction="vertical" align="center">
        <Typography className={"typoH5"}>{followers.length}</Typography>
        <Typography className={"typoSubtitle2"}>Followers</Typography>
      </Space>

      <Space direction="vertical" align="center">
        <Typography className={"typoH5"}>{followings.length}</Typography>
        <Typography className={"typoSubtitle2"}>Followings</Typography>
      </Space>
    </Box>
  );
};

export default FollowInfoBox;
