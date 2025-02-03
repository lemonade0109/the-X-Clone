import EmptyList from "@/components/ui/emptyList";
import { fetchSingleTweetAction } from "@/lib/actions/tweet/tweetActions";
import React from "react";
import TweetReplyContainer from "./TweetReplyContainer";
import Comments from "./Comments";

const TweetReply = async ({
  tweetId,
  userId,
}: {
  tweetId: string;
  userId: string;
}) => {
  const {
    tweet,
    isLiked,
    isBookmarked,
    likeCount,
    isRetweeted,
    retweetCount,
    tweetCommentCount,
  } = await fetchSingleTweetAction({ tweetId, userId });

  if (!tweet) return <EmptyList />;
  const { userName, name } = tweet.author;
  const { authorId, text, profileImage, id, image } = tweet;

  if (!image) return;

  return (
    <React.Fragment>
      <TweetReplyContainer
        name={name}
        userName={userName}
        authorId={authorId}
        tweetTxt={text}
        profileImage={profileImage}
        tweetId={id}
        tweetImage={image}
        commentCount={tweetCommentCount}
        isBookmarked={isBookmarked}
        isLiked={isLiked}
        likeCount={likeCount}
      />

      <Comments tweetId={tweetId} />
    </React.Fragment>
  );
};

export default TweetReply;
