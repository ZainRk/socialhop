import Box from "@/components/Box";
import React from "react";
import css from "@/styles/FollowInfoBox.module.css";
import { Divider, Space, Typography } from "antd";
const FollowInfoBox = () => {
  return (
    <Box className={css.container}>
      <Space direction="vertical" align="center">
        <Typography className={"typoH5"}>200</Typography>
        <Typography className={"typoSubtitle2"}>Followers</Typography>
      </Space>

      <Space direction="vertical" align="center">
        <Typography className={"typoH5"}>150</Typography>
        <Typography className={"typoSubtitle2"}>Followings</Typography>
      </Space>
    </Box>
  );
};

export default FollowInfoBox;
