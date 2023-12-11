"use client";
import { Button, Flex, Typography } from "antd";
import React from "react";
import Iconify from "../Iconify";

const LikeButton = () => {
  return (
    <Button type="text" size="small">
      <Flex gap={".5rem"} align="center">
        <Iconify icon="ph:heart-fill" width={"22px"} color="grey"/>

        <Typography.Text className="typoBody2">20 Likes</Typography.Text>
      </Flex>
    </Button>
  );
};

export default LikeButton;
