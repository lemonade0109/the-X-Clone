"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import RetweetIcon from "../icons/tweet-features/RetweetIcon";
import CommentIcon from "../icons/tweet-features/CommentIcon";
import LikeIcon from "../icons/tweet-features/LikeIcon";
import Bookmark from "../icons/tweet-features/Bookmark";
import { TweetProps } from "@/utils/interface";
import { useRouter } from "next/navigation";
import MoreDetails from "../ui/MoreDetails";

export interface TweetDataProps extends TweetProps {
  isLiked: boolean;
  likesCount: number;
  isBookmarked: boolean;
  isRetweeted?: boolean;
  retweetCount?: number;
  commentCount: number;
}

const Tweet = ({
  tweet,
  isLiked,
  likesCount,
  isBookmarked,
  commentCount,
}: TweetDataProps) => {
  const router = useRouter();

  if (!tweet) return <p>something went wrong kindly reload</p>;

  return (
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
            <h3 className="font-bold text-lg truncate">{tweet.author.name}</h3>
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

        <div className="flex justify-between">
          <CommentIcon tweet={tweet} commentCount={commentCount} />
          <RetweetIcon />
          <LikeIcon likesCount={likesCount} isLiked={isLiked} id={tweet.id} />
          <Bookmark isBookmarked={isBookmarked} id={tweet.id} />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
