"use client";

import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useRouter } from "next/navigation";
import Bookmark from "../icons/tweet-features/Bookmark";
import LikeIcon from "../icons/tweet-features/LikeIcon";
import RetweetIcon from "../icons/tweet-features/RetweetIcon";
import CommentIcon from "../icons/tweet-features/CommentIcon";
import Link from "next/link";
import Image from "next/image";
import { TweetReplyProps } from "@/utils/interface";
import PostyourreplyButton from "../ui/PostyourreplyButton";
import { Button } from "../ui/button";
import MoreDetails from "../ui/MoreDetails";

const TweetReply = ({
  tweet,
  isLiked,
  isBookmarked,
  isRetweeted,
  likeCount,
  retweetCount,
  tweetCommentCount,
}: TweetReplyProps) => {
  const router = useRouter();
  const [showReplyTab, setShowReplyTab] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <div className="flex items-center gap-8 border-b w-full h-16 border-gray-800 bg-transparent/85  px-4 py-2 sticky top-0 left-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                onClick={() => router.push("/home")}
                className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-white/15"
              >
                <IoMdArrowBack className="w-7 h-7" />
              </div>
            </TooltipTrigger>

            <TooltipContent
              side="bottom"
              className="rounded-sm bg-white/50 text-white/70 tracking-normal text-sm px-1 py-0"
            >
              <p>Back</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <h1 className="text-2xl mt-2 font-bold">Post</h1>
      </div>

      <div className="flex flex-col w-[100%] ">
        <div className="flex border-y hover:bg-white/5 transition-all border-gray-800 w-full p-4 space-x-2">
          <div className="">
            <Link href={`/${tweet.author.userName}`}>
              <img
                src={tweet.author.profileImage}
                alt="profile image"
                className="rounded-full w-14 h-12"
              />
            </Link>
          </div>

          <div className="flex flex-col space-y-4 w-full">
            <div className="flex justify-between ">
              <Link
                href={`/${tweet.author.userName}`}
                className="flex items-center  space-x-1"
              >
                <h3 className="font-bold text-lg truncate">
                  {tweet.author.name}
                </h3>
                <p className="text-gray-500 tracking-normal truncate">
                  @{tweet.author.userName}
                </p>
              </Link>

              <MoreDetails tweet={tweet} />
            </div>

            <div
              onClick={() => {
                router.push(`/${tweet.author.userName}/status/${tweet.id}`);
              }}
              className="flex flex-col justify-center space-y-2 cursor-pointer"
            >
              <p className="text-lg text-start max-w-2xl">{tweet.text}</p>

              <Link
                href={`/${tweet.author.userName}/status/${tweet.id}/photo/1`}
                className=" w-full h-96 rounded-xl relative"
              >
                <Image
                  src={tweet.image!}
                  alt={"image posted by the user"}
                  fill
                  className="rounded-xl"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between max-w-3xl ml-16 py-3 ">
          <CommentIcon tweet={tweet} commentCount={tweetCommentCount} />
          <RetweetIcon />
          <LikeIcon likesCount={likeCount} isLiked={isLiked!} id={tweet.id} />
          <Bookmark isBookmarked={isBookmarked!} id={tweet.id} />
        </div>

        <span className="border border-gray-900 "></span>
      </div>

      <div>
        {showReplyTab === false ? (
          <div
            onClick={() => setShowReplyTab(true)}
            className="flex space-x-3 border-b border-gray-800"
          >
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

            <div className="flex w-full py-6 ">
              <textarea
                placeholder="Post your reply"
                className="bg-transparent w-full text-start text-xl mb-0 pb-0 border-none  outline-none tracking-wide placeholder:text-2xl"
              />

              <div className="flex pr-2">
                <Button
                  disabled={true}
                  type="submit"
                  className=" font-bold rounded-full  px-6 py-6 text-black text-lg "
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <PostyourreplyButton
            tweet={tweet}
            setIsReplyModalOpen={setShowReplyTab}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default TweetReply;
