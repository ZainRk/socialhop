import React from "react";
import css from "@/styles/PopularTrends.module.css";
import { Avatar, Flex, Typography } from "antd";
import { mockTrends } from "@/mock/mockTrends";
import Iconify from "./Iconify";
const PopularTrends = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.bg} />
      {/* head */}
      <div className={css.container}>
        <Flex vertical>
          <Typography className="typoSubtitle2">TOP TRENDING</Typography>
          <Typography className="typoH4">#Popular Trends</Typography>
        </Flex>

        <Flex vertical gap={15}>
          {mockTrends.map((trend, i) => (
            <Flex key={i} gap={"1rem"} align="center">
              {/* trend icon */}
              <Avatar
                style={{ background: "#FF990047" }}
                icon={
                  <Iconify
                    icon="mingcute:hashtag-fill"
                    color="var(--primary)"
                    width="18px"
                  />
                }
              />
              {/* trend info */}
              <Flex vertical>
                <Typography
                  className="typoSubtitle1"
                  style={{ fontWeight: "bold" }}
                >
                  {trend.title}
                </Typography>
                <Typography
                  className="typoCaption"
                  style={{ fontWeight: "bold", color: "gray" }}
                >
                  {trend.posts} Posts
                </Typography>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default PopularTrends;
