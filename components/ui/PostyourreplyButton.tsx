"use client";
import { useToast } from "@/hooks/use-toast";
import { TweetProps } from "@/utils/interface";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { Button } from "./button";
import { replyTweetAction } from "@/lib/actions/tweet/tweetActions";
import ImagePicker from "../icons/tweet-formIcons/ImagePicker";
import GifPicker from "../icons/tweet-formIcons/GifPicker";
import EmojiPicker from "../icons/tweet-formIcons/EmojiPicker";

export interface PostyourreplyButtonProps extends TweetProps {
  setIsReplyModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostyourreplyButton = ({
  tweet,
  setIsReplyModalOpen,
}: PostyourreplyButtonProps) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isReplyPending, startTransition] = React.useTransition();
  const [replyText, setReplyText] = React.useState<string>("");

  return (
    <div className="flex space-x-3">
      <div className="flex items-center pl-2">
        <div className="w-14 h-14 rounded-full relative">
          <Image
            src={tweet.author.profileImage}
            alt="profile image"
            fill
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col w-full ">
        <div className="flex mt-5 mb-10 gap-2 text-gray-500 pl-16 pr-4 ">
          Replying to{" "}
          <span className="text-twitter"> @{tweet.author.userName} </span>
        </div>

        <textarea
          autoFocus={true}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Post your reply"
          className="bg-transparent w-full text-start text-xl mb-0 pb-0 border-none  outline-none tracking-wide placeholder:text-2xl"
        />

        <div className="flex pr-2 justify-between">
          <div className="flex items-start justify-start max-w-xl  ">
            <ImagePicker />
            <GifPicker />
            <EmojiPicker />
          </div>

          <Button
            disabled={isReplyPending}
            onClick={() => {
              if (userId) {
                startTransition(() => {
                  replyTweetAction({
                    replyText,
                    tweetId: tweet.id,
                    userId: userId,
                  })
                    .then(() => {
                      if (setIsReplyModalOpen === undefined) return;
                      setIsReplyModalOpen(false);
                    })
                    .catch(() => {
                      toast({
                        description: "Something went wrong",
                      });
                    });
                });
              } else {
                toast({
                  description: "Please login to reply a tweet",
                });
              }
            }}
            type="submit"
            className=" font-bold rounded-full  px-6 py-6 text-black text-lg"
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostyourreplyButton;
