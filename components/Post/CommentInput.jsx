import { Avatar, Button, Flex, Input } from "antd";
import React from "react";
import Iconify from "../Iconify";

const CommentInput = () => {
  return (
    <Flex gap={"1rem"} align="center">
      {/* avatar */}
      <Avatar src="/images/avatar.png" size={40}
      style={{minWidth: '40px'}}
      />

      {/* input box */}
      <Input.TextArea
        placeholder={"Write a comment..."}
        style={{ resize: "none" }}
        autoSize={{ minRows: 1, maxRows: 5 }}
      />

      <Button type="primary">
        <Iconify icon="iconamoon:send-fill" width="1.2rem" />
      </Button>
    </Flex>
  );
};

export default CommentInput;
