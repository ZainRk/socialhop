"use client";
import React from "react";
import css from "@/styles/ProfileView.module.css";
import ProfileHead from "../ProfileHead";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions/user";
import ProfileBody from "../ProfileBody";
import FollowPersonsBody from "../FollowPersonsBody";
const ProfileView = ({ userId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
  });
  const [selectedTab, setSelectedTab] = React.useState("1");
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        {/* head (inclued banner) */}
        <ProfileHead
          data={data}
          isLoading={isLoading}
          isError={isError}
          userId={userId}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        {/* body */}
        {selectedTab === "1" && (
          <ProfileBody
            userId={userId}
            data={data}
            isLoading={isLoading}
            isError={isError}
          />
        )}

        {selectedTab === "2" && (
          <FollowPersonsBody type={"followers"} id={userId} />
        )}

        {
          selectedTab === "3" && (
            <FollowPersonsBody type={"following"} id={userId} />
          )
        }
      </div>
    </div>
  );
};

export default ProfileView;
