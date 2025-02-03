import React from "react";

import Tweets from "./Tweets";
import { fetchTweetsAction } from "@/lib/actions/tweet/tweetActions";

const Feeds = async () => {
  const tweets = await fetchTweetsAction();

  if (tweets.length === 0)
    return (
      <p className="text-gray-500 font-bold text-2xl uppercase">
        Something went wrong try reloading
      </p>
    );

  return (
    <section className="flex flex-col w-[100%]">
      {tweets.map((tweet) => (
        <Tweets tweet={tweet} key={tweet.id} />
      ))}
    </section>
  );
};

export default Feeds;
