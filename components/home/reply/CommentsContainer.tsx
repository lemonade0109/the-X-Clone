"use client";
import Image from "next/image";
import React from "react";
import CommentIcon from "../icons/CommentIcon";
import RetweetIcon from "../icons/RetweetIcon";
import LikeIcon from "../icons/LikeIcon";
import Bookmark from "../icons/Bookmark";
import { CommentProps } from "@/utils/interface";
import { useAuth } from "@clerk/nextjs";
import MoreDetails from "../../ui/moreDetails";

const CommentsContainer = ({ comments }: CommentProps) => {
  const { userId } = useAuth();
  const { name, userName, profileImage } = comments.author;
  const authorId = comments.author.id;
  const { likes, reply, bookmarks, id, text } = comments;

  if (!comments) return;

  //! TODO: create the commentReply prisma schema. The one used is the tweetReply prisma schema(TEMP)
  const likesCount = likes.length ?? 0;
  const commentCount = reply.length ?? 0;

  const isLiked = likes.some((like) => like.userId === userId);
  const isBookmarked = bookmarks?.some(
    (bookmark) => bookmark.userId === userId
  );
  return (
    <React.Fragment>
      <div className="flex min-h-40">
        <div className="flex  w-full py-2 px-4 space-x-2">
          <div className="flex items-start pl-2">
            <div className="w-12 h-12 rounded-full relative">
              <Image
                src={profileImage}
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
                  <h3 className="font-bold text-lg truncate">{name}</h3>
                  <p className="text-gray-500 tracking-normal truncate">
                    @{userName}
                  </p>
                </div>

                <MoreDetails tweetId={id} authorId={authorId} />
              </div>

              <div>
                <p>{text}</p>
              </div>
            </div>

            <div className="flex justify-between ">
              <CommentIcon
                tweetTxt={text}
                name={name}
                userName={userName}
                commentCount={commentCount}
                tweetId={id}
                profileImage={profileImage}
              />
              <RetweetIcon />
              <LikeIcon likesCount={likesCount} isLiked={isLiked} id={id} />
              <Bookmark id={id} isBookmarked={isBookmarked!} />
            </div>
          </div>
        </div>
      </div>
      <span className=" border-b border-gray-800 w-full"></span>
    </React.Fragment>
  );
};

export default CommentsContainer;
