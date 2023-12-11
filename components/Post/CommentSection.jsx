"use client";
import { Avatar, Flex, Typography } from "antd";
import React, { useContext } from "react";
import css from "@/styles/Post.module.css";
import Box from "../Box";
import { SettingsContext } from "@/context/settings/settings-context";
import cx from "classnames";
import CommentInput from "./CommentInput";
const CommentSection = () => {
  return (
    <Flex vertical gap={'1rem'}>
      {/* comments */}
      <Comment />

      <CommentInput/>
    </Flex>
  );
};

export default CommentSection;

function Comment() {
  const {
    settings: { theme },
  } = useContext(SettingsContext);

  return (
    <Box>
      <Flex gap={".5rem"}>
        {/* person image */}
        <Avatar size={30} src={"https://i.pravatar.cc/300"} />

        {/* person comment */}
        <Flex vertical flex={1} gap={".5rem"} className={cx(css.comment, css[theme])}>
          {/* name and date */}
          <Flex align="center" justify="space-between">
            {/* name */}
            <Typography.Text className="typoSubtitle2">
              Jaydon Frankie
            </Typography.Text>

            {/* date */}
            <Typography.Text className="typoCaption" type="secondary" strong>
              28 Nov 2023
            </Typography.Text>
          </Flex>

          {/* comment text */}
          <Typography.Text className="typoBody2">
            Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt
            et, tincidunt eget, semper nec, quam. Sed lectus.
          </Typography.Text>
        </Flex>
      </Flex>
    </Box>
  );
}
