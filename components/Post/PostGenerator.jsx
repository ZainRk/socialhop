"use client";
import React, { useRef } from "react";
import css from "@/styles/PostGenerator.module.css";
import Box from "../Box";
import { Avatar, Button, Flex, Input, Typography } from "antd";
import Iconify from "../Iconify";

const PostGenerator = () => {
  const imgInputRef = useRef(null);
  const vidInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
  };

  return (
    <>
      <div className={css.postGenWrapper}>
        <Box className={css.container}>
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
                maxLength={100}
                placeholder={"Share what you are thinking..."}
                style={{ height: 80, resize: "none", flex: 1 }}
              />

              <Flex
                align="center"
                justify="space-between"
                className={css.bottom}
              >
                {/* upload buttons */}
                <Flex gap={"1rem"}>
                  {/* image upload button */}
                  <Button
                    type="text"
                    style={{ background: "borderColor" }}
                    onClick={() => imgInputRef.current.click()}
                  >
                    <Flex align="center" gap={".5rem"}>
                      <Iconify
                        icon="solar:camera-linear"
                        width="1.2rem"
                        color="var(--primary)"
                      />
                      <Typography className="typoSubtitle2">Image</Typography>
                    </Flex>
                  </Button>

                  {/* video upload button */}
                  <Button
                    type="text"
                    style={{ background: "borderColor" }}
                    onClick={() => vidInputRef.current.click()}
                  >
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
                    <Iconify icon="iconamoon:send-fill" width="1.2rem" />
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
        </Box>
      </div>
      {/* make an input to only accept img files and max number of files as 1 */}
      <input
        type="file"
        accept="image/*"
        multiple={false}
        style={{ display: "none" }}
        ref={imgInputRef}
        onChange={(e) => handleFileUpload(e)}
      />
      {/* make an input to only accept img files and max number of files as 1 */}
      <input
        type="file"
        accept="video/*"
        multiple={false}
        style={{ display: "none" }}
        ref={vidInputRef}
        onChange={(e) => handleFileUpload(e)}
      />
    </>
  );
};

export default PostGenerator;
