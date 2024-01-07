"use client";
import { updateFollow } from "@/actions/user";
import { Button, Typography } from "antd";
import React from "react";

const FollowButton = ({ id }) => {
  return (
    <Button
      type="primary"
      style={{
        background: "var(--gradient)",
      }}
      onClick={() => updateFollow(id, "follow")}
    >
      <Typography className="typoSubtitle2" style={{ color: "white" }}>
        Follow
      </Typography>
    </Button>
  );
};

export default FollowButton;
