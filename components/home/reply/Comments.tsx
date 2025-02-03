import { fetchRepliesAction } from "@/lib/actions/tweet/tweetActions";
import React from "react";
import CommentsContainer from "./CommentsContainer";

const Comments = async ({ tweetId }: { tweetId: string }) => {
  const { comments } = await fetchRepliesAction({ tweetId });

  if (!comments) return;

  {
    return comments.map((comment) => (
      <CommentsContainer key={comment.id} comments={comment} />
    ));
  }
};
export default Comments;
