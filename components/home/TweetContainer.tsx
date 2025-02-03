"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import BookmarkIcon from "./icons/Bookmark";
import LikeIcon from "./icons/LikeIcon";
import RetweetIcon from "./icons/RetweetIcon";
import CommentIcon from "./icons/CommentIcon";
import MoreDetails from "../ui/moreDetails";
import { TweetContainerProps } from "@/utils/interface";

const TweetContainer = (props: TweetContainerProps) => {
  const router = useRouter();

  return (
    <div className="flex border-y hover:bg-white/5 transition-all border-gray-800 w-full p-4 space-x-2">
      <div className="flex items-center justify-center w-16 h-14 relative">
        <Link href={`/${props.userName}`}>
          <Image
            src={props.profileImage}
            alt="profile image"
            fill
            className="rounded-full"
          />
        </Link>
      </div>

      <div className="flex flex-col space-y-4 w-full">
        <div className="flex justify-between ">
          <Link
            href={`/${props.userName}`}
            className="flex items-center  space-x-1"
          >
            <h3 className="font-bold text-lg truncate">{props.name}</h3>
            <p className="text-gray-500 tracking-normal truncate">
              @{props.userName}
            </p>
          </Link>

          <MoreDetails tweetId={props.tweetId} authorId={props.authorId} />
        </div>

        <div
          onClick={() => {
            router.push(`/${props.userName}/status/${props.tweetId}`);
          }}
          className="flex flex-col justify-center space-y-2 cursor-pointer"
        >
          <p className="text-lg text-start max-w-2xl">{props.tweetTxt}</p>

          {props.tweetImage && (
            <Link
              href={`/${props.userName}/status/${props.tweetId}/photo/1`}
              className=" w-full h-96 rounded-xl relative"
            >
              <Image
                src={props.tweetImage!}
                alt={"image posted by the user"}
                fill
                className="rounded-xl"
              />
            </Link>
          )}
        </div>

        <div className="flex justify-between">
          <CommentIcon
            name={props.name}
            profileImage={props.profileImage}
            tweetId={props.tweetId}
            tweetTxt={props.tweetTxt}
            userName={props.userName}
            commentCount={props.commentCount}
          />
          <RetweetIcon />
          <LikeIcon
            likesCount={props.likeCount}
            isLiked={props.isLiked}
            id={props.tweetId}
          />
          <BookmarkIcon isBookmarked={props.isBookmarked} id={props.tweetId} />
        </div>
      </div>
    </div>
  );
};

export default TweetContainer;
