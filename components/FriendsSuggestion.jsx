"use client";
import React from "react";
import Box from "./Box";
import css from "@/styles/FollowSuggestions.module.css";
import { Avatar, Flex, Typography } from "antd";
import { mockFriends } from "@/mock/mockFriends";
import UserBox from "./UserBox";
import { getFollowSuggestions } from "@/actions/user";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
const { Text } = Typography;
const FollowSuggestions = () => {
  const { user } = useUser();
  const { data, isLoading, isError } = useQuery({
    query: ["user", user?.id, "followSuggestions"],
    queryFn: () => getFollowSuggestions(user?.id),
    enabled: !!user,

    staleTime: 1000 * 60 * 20,
  });
  console.log(data);
  return (
    <div className={css.wrapper}>
      <Box>
        <div className={css.container}>
          <div className={css.title}>
            <Text className={"typoSubtitle1"}>Follow Suggestions</Text>
          </div>

          {/* suggestions*/}
          {/* <Flex vertical gap={"1rem"}>
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
          </Flex> */}
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
          <UserBox />
        </div>
      </Box>
    </div>
  );
};

export default FollowSuggestions;
