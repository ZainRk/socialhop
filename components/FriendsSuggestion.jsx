"use client";
import React from "react";
import Box from "./Box";
import css from "@/styles/FriendsSuggestion.module.css";
import { Avatar, Flex, Typography } from "antd";
import { mockFriends } from "@/mock/mockFriends";
const { Text } = Typography;
const FriendsSuggestion = () => {
  return (
    <div className={css.wrapper}>
      <Box>
        <div className={css.container}>
          <div className={css.title}>
            <Text className={"typoSubtitle1"}>Friends Suggestion</Text>
          </div>

          {/* suggestions*/}
          <Flex vertical gap={"1rem"}>
            {mockFriends.map((person, i) => (
              <Flex key={i} gap={"1rem"}>
                <Avatar src={`/images/${person.img}`} size={40} />

                <Flex vertical>
                  <Text className="typoBody2" strong>
                    {person.name}
                  </Text>
                  <Text className="typoCaption" strong type="secondary">
                    Follows you
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </div>
      </Box>
    </div>
  );
};

export default FriendsSuggestion;
