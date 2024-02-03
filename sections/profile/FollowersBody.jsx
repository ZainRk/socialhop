import React from "react";
import css from "@/styles/FollowersBody.module.css";
import { Alert, Skeleton, Typography } from "antd";
import UserBox from "@/components/UserBox";
import { useQuery } from "@tanstack/react-query";
import { getAllFollowersAndFollowings } from "@/actions/user";
import { useUser } from "@clerk/nextjs";
const FollowersBody = (id) => {
  const { user: currentUser } = useUser();

  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
  } = useQuery({
    queryKey: ["user", id, "followInfo"],
    queryFn: () => getAllFollowersAndFollowings(id),
    enabled: !!id,
    // 20 mins stale time
    staleTime: 1000 * 60 * 20,
  });

  const {
    data: currentUserData,
    currentUserLoading,
    currentUserError,
  } = useQuery({
    queryKey: ["user", id, "followInfo"],
    queryFn: () => getAllFollowersAndFollowings(currentUser?.id),
    enabled: !!id,
    // 20 mins stale time
    staleTime: 1000 * 60 * 20,
  });

  if (userDataLoading)
    return (
      <Skeleton.Button
        active={true}
        size="large"
        style={{ width: "100%", height: "3.5rem" }}
      />
    );

  if (userDataError)
    return <Alert message="Error while fetching data" type="error" />;

  return (
    <div className={css.container}>
      <div className={css.head}>
        <Typography className={"typoH5"}>Followers</Typography>
      </div>
      <div className={css.body}>
        {/* <UserBox />
        <UserBox />
        <UserBox /> */}
        {userData?.followers?.map((person) => (
          <UserBox
            key={person.followerId}
            data={person}
            loggedInUserData={currentUserData}
          />
        ))}
      </div>
    </div>
  );
};

export default FollowersBody;
