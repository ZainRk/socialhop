import React from "react";
import css from "@/styles/ProfileView.module.css";
import ProfileHead from "../ProfileHead";
import Posts from "@/components/Post/Posts";
import FollowInfoBox from "../FollowInfoBox";
import PostGenerator from "@/components/Post/PostGenerator";
import FriendsSuggestion from "@/components/FriendsSuggestion";
import { currentUser } from "@clerk/nextjs";
import FollowButton from "../FollowButton";
const ProfileView = async ({ userId }) => {
  const user = await currentUser();
  const isCurrentUser = user?.id === userId;
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        {/* head (inclued banner) */}
        <ProfileHead userId={userId} />

        {/* body */}
        <div className={css.profileBody}>
          <div className={css.left}>
            <div className={css.sticky}>
              {!isCurrentUser && <FollowButton id={userId} />}
              <FollowInfoBox />
              <FriendsSuggestion />
            </div>
          </div>
          <div className={css.right}>
            {isCurrentUser && <PostGenerator />}
            <Posts id={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
