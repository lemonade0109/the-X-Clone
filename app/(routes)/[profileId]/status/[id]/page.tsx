import { getAuthUser } from "@/lib/authUser";
import React from "react";
import TweetReply from "@/components/home/reply/TweetReply";

export default async function TweetReplyPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getAuthUser();
  const { id: tweetId } = await params;

  return (
    <section className="flex flex-col w-full ">
      <TweetReply tweetId={tweetId} userId={user.id} />
    </section>
  );
}
