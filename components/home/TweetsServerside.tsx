import React from "react";

import { TweetProps } from "@/utils/interface";
import { getAuthUser } from "@/lib/authUser";
import {
  fetchLikesCountAndCheckIfLiked,
  fetchRepliesAction,
  fetchTweetBookmarkAction,
} from "@/lib/actions/tweet/tweetActions";
import Tweet from "./TweetsClientside";

const Tweets = async ({ tweet }: TweetProps) => {
  if (!tweet) {
    return (
      <p className="text-gray-500 font-bold text-2xl uppercase">
        Kindly post your first tweet
      </p>
    );
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

  return (
    <Tweet
      tweet={tweet}
      isLiked={isLiked}
      likesCount={likesCount}
      isBookmarked={isBookmarked}
      commentCount={commentCount}
    />
  );
};

export default Tweets;
