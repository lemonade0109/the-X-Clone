"use client";
import Image from "next/image";
import React from "react";
import CommentIcon from "../icons/tweet-features/CommentIcon";
import RetweetIcon from "../icons/tweet-features/RetweetIcon";
import LikeIcon from "../icons/tweet-features/LikeIcon";
import Bookmark from "../icons/tweet-features/Bookmark";
import { CommentProps } from "@/utils/interface";
import { useAuth } from "@clerk/nextjs";
import MoreDetails from "../ui/MoreDetails";

const CommentsClientside = ({ comments }: CommentProps) => {
  const { userId } = useAuth();

  //! TODO: create the commentReply prisma schema. The one used is the tweetReply prisma schema(TEMP)
  const likesCount = comments.likes?.length ?? 0;
  const commentCount = comments.reply?.length ?? 0;

  const isLiked = comments.likes?.some((like) => like.userId === userId);
  const isBookmarked = comments.bookmarks?.some(
    (bookmark) => bookmark.userId === userId
  );
  return (
    <React.Fragment>
      <div className="flex min-h-40">
        <div className="flex  w-full py-2 px-4 space-x-2">
          <div className="flex items-start pl-2">
            <div className="w-12 h-12 rounded-full relative">
              <Image
                src={comments.author.profileImage}
                alt="profile image"
                fill
                className="rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-4 ">
            <div>
              <div className="flex justify-between ">
                <div className="flex items-center  space-x-1">
                  <h3 className="font-bold text-lg truncate">
                    {comments.author.name}
                  </h3>
                  <p className="text-gray-500 tracking-normal truncate">
                    @{comments.author.userName}
                  </p>
                </div>

                <MoreDetails />
              </div>

              <div>
                <p>{comments.text}</p>
              </div>
            </div>

            <div className="flex justify-between ">
              <CommentIcon tweet={comments} commentCount={commentCount} />
              <RetweetIcon />
              <LikeIcon
                likesCount={likesCount}
                isLiked={isLiked}
                id={comments.id}
              />
              <Bookmark id={comments.id} isBookmarked={isBookmarked!} />
            </div>
          </div>
        </div>
      </div>
      <span className=" border-b border-gray-800 w-full"></span>
    </React.Fragment>
  );
};

export default CommentsClientside;
