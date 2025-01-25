import TweetReply from "@/components/reply/TweetReply";
import { fetchTweetAction } from "@/lib/actions/tweet/tweetActions";
import { getAuthUser } from "@/lib/authUser";
import React from "react";
import Comments from "@/components/reply/CommentsServerside";

export default async function TweetReplyPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getAuthUser();
  const { id: tweetId } = await params;
  const {
    tweet,
    isLiked,
    isBookmarked,
    isRetweeted,
    likeCount,
    retweetCount,
    tweetCommentCount,
  } = await fetchTweetAction({ tweetId, userId: user.id });

  if (!tweet) return <p>Something went wrong! kindly reload</p>;

  return (
    <section className="flex flex-col w-[50%] ">
      <TweetReply
        tweet={tweet}
        isLiked={isLiked!}
        isBookmarked={isBookmarked!}
        isRetweeted={isRetweeted!}
        likeCount={likeCount}
        retweetCount={retweetCount}
        tweetCommentCount={tweetCommentCount}
      />

      <Comments tweetId={tweetId} />
    </section>
  );
}
