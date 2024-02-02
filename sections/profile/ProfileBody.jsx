import React from "react";
import css from "@/styles/ProfileView.module.css";
import FollowButton from "./FollowButton";
import FollowInfoBox from "./FollowInfoBox";
import FriendsSuggestion from "@/components/FriendsSuggestion";
import PostGenerator from "@/components/Post/PostGenerator";
import Posts from "@/components/Post/Posts";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
const ProfileBody = ({ userId }) => {
  const { user: currentUser } = useUser();
  const isCurrentUser = currentUser?.id === userId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", currentUser?.id, "followInfo"],
    queryFn: () => getAllFollowersAndFollowings(currentUser?.id),
    enabled: !!currentUser,
    // 20 mins stale time
    staleTime: 1000 * 60 * 20,
  });
  return (
    <div className={css.profileBody}>
      <div className={css.left}>
        <div className={css.sticky}>
          {!isCurrentUser && (
            <FollowButton
              id={userId}
              data={data}
              isLoading={isLoading}
              isError={isError}
            />
          )}

          {/* start from here */}
          <FollowInfoBox
            isLoading={isLoading}
            isError={isError}
            followers={data?.followers?.length}
            followings={data?.following?.length}
          />
          <FriendsSuggestion />
        </div>
      </div>
      <div className={css.right}>
        {isCurrentUser && <PostGenerator />}
        <Posts id={userId} />
      </div>
    </div>
  );
};

export default ProfileBody;
