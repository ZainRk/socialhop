"use client";
import React from "react";
import css from "@/styles/PostGenerator.module.css";
import Box from "./Box";
import { Avatar, Button, Flex, Input, Typography } from "antd";
import Iconify from "./Iconify";

const PostGenerator = () => {
  return (
    <div className={css.wrapper}>
      <Box>
        <div className={css.container}>
          <Flex gap={"1.5rem"} align={"flex-start"}>
            {/* avatar */}
            <Avatar
              src="/images/avatar.png"
              style={{
                boxShadow: "var(--avatar-shadow)",
                width: "3rem",
                height: "2.6rem",
              }}
            />

            <Flex vertical gap={"1rem"} style={{ width: "100%" }}>
              <Input.TextArea
                showCount
                maxLength={100}
                placeholder={"Share what you are thinking..."}
                style={{ height: 80, resize: "none", flex: 1 }}
              />

              <Flex align="center" justify="space-between">
                {/* upload buttons */}
                <Flex gap={"1rem"}>
                  <Button type="text" style={{ background: "borderColor" }}>
                    <Flex align="center" gap={".5rem"}>
                      <Iconify
                        icon="solar:camera-linear"
                        width="1.2rem"
                        color="var(--primary)"
                      />
                      <Typography className="typoSubtitle2">Image</Typography>
                    </Flex>
                  </Button>
                  <Button type="text" style={{ background: "borderColor" }}>
                    <Flex align="center" gap={".5rem"}>
                      <Iconify
                        icon="gridicons:video"
                        width="1.2rem"
                        color="#5856D6"
                      />
                      <Typography className="typoSubtitle2">Video</Typography>
                    </Flex>
                  </Button>
                </Flex>

                <Button type="primary">
                  <Flex align="center" gap={".5rem"}>
                    <Iconify
                      icon="iconamoon:send-fill"
                      width="1.2rem"
                    />
                    <Typography
                      className="typoSubtitle2"
                      style={{ color: "white" }}
                    >
                      Post
                    </Typography>
                  </Flex>
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </Box>
    </div>
  );
};

export default PostGenerator;
