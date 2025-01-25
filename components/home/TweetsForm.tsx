"use client";

import React from "react";
import ImagePicker from "../icons/tweet-formIcons/ImagePicker";
import { createTweetAction } from "@/lib/actions/tweet/tweetActions";

import { Button } from "../ui/button";
import GifPicker from "../icons/tweet-formIcons/GifPicker";
import EmojiPicker from "../icons/tweet-formIcons/EmojiPicker";
import { useToast } from "@/hooks/use-toast";

const TweetsForm = () => {
  const [state, formAction] = React.useActionState(createTweetAction, {
    message: "",
  });

  const { toast } = useToast();
  React.useEffect(() => {
    if (state && state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <div className="flex pt-3 ">
        <div className="w-12 h-12 bg-gray-400 rounded-full mx-2"></div>

        <div className="border border-green-500 flex flex-col w-full h-full  py-4  bg-black">
          <textarea
            placeholder="What's happening?!"
            className="w-full h-full text-start text-xl  pl-3 pt-6 mb-0 pb-0 border-none  outline-none tracking-wide bg-black placeholder:text-3xl"
            name="tweet"
          />

          <div className="flex justify-between px-2 border border-red-500">
            <div className=" max-w-xl">
              <ImagePicker />
              <GifPicker />
              <EmojiPicker />
            </div>

            <Button
              // disabled
              type="submit"
              className=" font-bold rounded-full  px-6 py-6 text-black text-lg"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      <div className="border-b border-slate-800 "></div>
    </form>
  );
};

export default TweetsForm;
