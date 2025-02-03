import React from "react";

import { TweetProps } from "@/utils/interface";
import { getAuthUser } from "@/lib/authUser";
import {
  fetchLikesCountAndCheckIfLiked,
  fetchRepliesAction,
  fetchTweetBookmarkAction,
} from "@/lib/actions/tweet/tweetActions";
import TweetContainer from "./TweetContainer";
import EmptyList from "../ui/emptyList";

const Tweets = async ({ tweet }: TweetProps) => {
  if (!tweet) {
    return <EmptyList />;
  }

  const user = await getAuthUser();

  const { likesCount, isLiked } = await fetchLikesCountAndCheckIfLiked(
    tweet.id,
    user.id
  );
  const isBookmarked = await fetchTweetBookmarkAction(tweet.id, user.id);
  const { commentCount } = await fetchRepliesAction({
    tweetId: tweet.id,
  });

  const { userName, name } = tweet.author;
  const { authorId, text, profileImage, id, image } = tweet;

  return (
    <TweetContainer
      userName={userName}
      name={name}
      authorId={authorId}
      tweetId={id}
      tweetImage={image}
      tweetTxt={text}
      profileImage={profileImage}
      isBookmarked={isBookmarked}
      isLiked={isLiked}
      commentCount={commentCount}
      likeCount={likesCount}
    />
  );
};

export default Tweets;
