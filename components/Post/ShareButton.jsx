"use client";
import { Button, Flex, Typography } from "antd";
import React from "react";
import Iconify from "../Iconify";

const ShareButton = () => {
  return (
    <Button type="text" size="small">
      <Flex gap={".5rem"} align="center">
        <Iconify icon="mingcute:share-2-fill" width={"22px"} color="grey" />
        <Typography.Text className="typoBody2">Share</Typography.Text>
      </Flex>
    </Button>
  );
};

export default ShareButton;
