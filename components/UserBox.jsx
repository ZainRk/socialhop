import React, { useState } from "react";
import css from "@/styles/UserBox.module.css";
import Box from "./Box";
import { Avatar, Button, Flex, Typography } from "antd";
import { Icon } from "@iconify/react";
const UserBox = () => {
  const [followed, setFollowed] = useState(true);
  return (
    <Box className={css.container}>
      <div className={css.left}>
        <Avatar src={`/images/avatar2.png`} size={40} />
        <div className={css.details}>
          <Typography.Text className={"typoSubtitle2"}>
            John Doe
          </Typography.Text>
          <Typography.Text className={"typoCaption"} type="secondary">
            @johndoe
          </Typography.Text>
        </div>
      </div>

      <div className={css.right}>
        {!followed && (
          <Button className={css.button} type="text" size="small">
            <Typography.Text strong>Follow</Typography.Text>
          </Button>
        )}
        {followed && (
          <Button type="text" size="small">
            <Flex gap={10} align="center">
              <Icon icon={"charm:tick"} width={18} color="#3db66a" />
              <Typography.Text strong style={{ color: "#3db66a" }}>
                Followed
              </Typography.Text>
            </Flex>
          </Button>
        )}
      </div>
    </Box>
  );
};

export default UserBox;
