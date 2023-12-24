"use client";
import { Avatar, Button, Flex, Typography } from "antd";
import React, { useContext, useState } from "react";
import css from "@/styles/Post.module.css";
import Box from "../Box";
import { SettingsContext } from "@/context/settings/settings-context";
import cx from "classnames";
import CommentInput from "./CommentInput";
import Iconify from "../Iconify";
import dayjs from "dayjs";
const EXPAND_ICONS = {
  true: "ic:outline-expand-less",
  false: "ic:outline-expand-more",
};
const CommentSection = ({ comments, postId }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Flex vertical gap={"1rem"}>
      <>
        {comments?.length > 1 && (
          <Button type="text" onClick={() => setExpanded((prev) => !prev)}>
            <Flex align="center" gap={".5rem"} justify="center">
              <Iconify icon={EXPAND_ICONS[expanded]} />
              Show more comments
            </Flex>
          </Button>
        )}
        {/* comments */}
        {comments?.length > 0 && (
          <Flex vertical gap={".5rem"} className={css.commentsContainer}>
            {!expanded ? (
              <Comment data={comments[comments?.length - 1]} />
            ) : (
              comments?.map((comment) => (
                <Comment key={comment?.id} data={comment} />
              ))
            )}
          </Flex>
        )}
      </>

      <CommentInput postId={postId} setExpanded={setExpanded}/>
    </Flex>
  );
};

export default CommentSection;

function Comment({ data }) {
  const {
    settings: { theme },
  } = useContext(SettingsContext);

  return (
    <Box>
      <Flex gap={".5rem"}>
        {/* person image */}
        <Avatar size={30} src={data?.author?.image_url} />

        {/* person comment */}
        <Flex
          vertical
          flex={1}
          gap={".5rem"}
          className={cx(css.comment, css[theme])}
        >
          {/* name and date */}
          <Flex align="center" justify="space-between">
            {/* name */}
            <Typography.Text className="typoSubtitle2">
              {data?.author?.first_name} {data?.author?.last_name}
            </Typography.Text>

            {/* date */}
            <Typography.Text className="typoCaption" type="secondary" strong>
              {dayjs(data?.created_at).format("DD MMM YYYY")}
            </Typography.Text>
          </Flex>

          {/* comment text */}
          <Typography.Text className="typoBody2">
            {data?.comment}
          </Typography.Text>
        </Flex>
      </Flex>
    </Box>
  );
}
