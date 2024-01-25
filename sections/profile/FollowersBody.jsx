import React from "react";
import css from "@/styles/FollowersBody.module.css";
import { Typography } from "antd";
import UserBox from "@/components/UserBox";
const FollowersBody = () => {
  return (
    <div className={css.container}>
      <div className={css.head}>
        <Typography className={"typoH5"}>Followers</Typography>
      </div>
      <div className={css.body}>
        <UserBox />
        <UserBox />
        <UserBox />
      </div>
    </div>
  );
};

export default FollowersBody;
