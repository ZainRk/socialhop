import React from "react";
import css from "@/styles/ProfileView.module.css";
import FollowButton from "./FollowButton";
import FollowInfoBox from "./FollowInfoBox";
import FriendsSuggestion from "@/components/FriendsSuggestion";
import PostGenerator from "@/components/Post/PostGenerator";
import Posts from "@/components/Post/Posts";
import { useUser } from "@clerk/nextjs";
const ProfileBody = ({ userId, data, isLoading, isError }) => {
  const { user } = useUser();
  const isCurrentUser = user?.id === userId;
  return (
    <div className={css.profileBody}>
      <div className={css.left}>
        <div className={css.sticky}>
          {!isCurrentUser && (
            <FollowButton
              id={userId}
            />
          )}
          {/* <FollowInfoBox
            followers={data?.data?.followers}
            followings={data?.data?.following}
          />
          <FriendsSuggestion /> */}
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
