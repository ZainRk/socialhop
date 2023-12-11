"use client";
import { Button, Flex, Typography } from "antd";
import React from "react";
import Iconify from "../Iconify";

const CommentButton = () => {
  return (
    <Button type="text" size="small">
      <Flex gap={".5rem"} align="center">
        <Iconify icon="iconamoon:comment-dots-fill" width={"21px"} color="grey"/>
        <Typography.Text className="typoBody2">5 Comments</Typography.Text>
      </Flex>
    </Button>
  );
};

export default CommentButton;
