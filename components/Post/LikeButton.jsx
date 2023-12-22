"use client";
import { Button, Flex, Typography } from "antd";
import React, { useState } from "react";
import Iconify from "../Iconify";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useUser } from "@clerk/nextjs";

const LikeButton = ({ handleButtonClick, likes }) => {
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(
    likes?.some((like) => like?.authorId === user?.id)
  );

  return (
    <HappyProvider>
      <Button
        size="small"
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
        onClick={handleButtonClick}
      >
        <Flex gap={".5rem"} align="center">
          <Iconify
            icon="ph:heart-fill"
            width={"22px"}
            style={{ color: isLiked ? "var(--primary)" : "grey" }}
          />

          <Typography.Text className="typoBody2">20 Likes</Typography.Text>
        </Flex>
      </Button>
    </HappyProvider>
  );
};

export default LikeButton;
