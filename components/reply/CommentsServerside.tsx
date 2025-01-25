import { fetchRepliesAction } from "@/lib/actions/tweet/tweetActions";
import React from "react";
import CommentsClientside from "./CommentsClientside";

const Comments = async ({ tweetId }: { tweetId: string }) => {
  const { comments } = await fetchRepliesAction({ tweetId });

  if (!comments) return <p>Something went wrong! kindly reload</p>;

  {
    return comments.map((comment) => (
      <CommentsClientside key={comment.id} comments={comment} />
    ));
  }
};
export default Comments;
