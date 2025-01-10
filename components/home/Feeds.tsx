import React from "react";

import Posts from "./Posts";
import { fetchTweetAction } from "@/lib/actions/tweet/tweetActions";

const Feeds = async () => {
  const tweets = await fetchTweetAction();

  if (!tweets)
    return (
      <p className="text-gray-500 font-bold text-2xl uppercase">
        Something went wrong try reloading
      </p>
    );

  return (
    <div className="flex flex-col w-[100%]">
      {tweets.map((tweet) => (
        <Posts tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
};

export default Feeds;
