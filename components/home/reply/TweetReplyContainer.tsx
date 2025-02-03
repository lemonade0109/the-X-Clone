"use client";

import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PostyourreplyButton from "../../ui/postyourreplyButton";
import { Button } from "../../ui/button";
import { TooltipContainer } from "@/components/ui/tooltipContainer";
import TweetContainer from "../TweetContainer";
import { TweetContainerProps } from "@/utils/interface";
import HeaderContainer from "@/components/ui/headerContainer";

const TweetReplyContainer = ({
  name,
  profileImage,
  tweetId,
  tweetTxt,
  tweetImage,
  authorId,
  userName,
  isLiked,
  isBookmarked,
  likeCount,
  isRetweeted,
  retweetCount,
  commentCount,
}: TweetContainerProps) => {
  const router = useRouter();
  const [showReplyTab, setShowReplyTab] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <HeaderContainer>
        <TooltipContainer variant="blackShade" content="back">
          <div
            onClick={() => router.push("/home")}
            className="flex items-center justify-center rounded-full w-10 h-10 hover:bg-white/15"
          >
            <IoMdArrowBack className="w-7 h-7" />
          </div>
        </TooltipContainer>

        <h1 className="text-2xl mt-2 font-bold">Post</h1>
      </HeaderContainer>

      <TweetContainer
        name={name}
        userName={userName}
        authorId={authorId}
        tweetTxt={tweetTxt}
        tweetImage={tweetImage}
        profileImage={profileImage}
        tweetId={tweetId}
        isBookmarked={isBookmarked}
        isLiked={isLiked}
        likeCount={likeCount}
        commentCount={commentCount}
      />

      <div>
        {showReplyTab === false ? (
          <div
            onClick={() => setShowReplyTab(true)}
            className="flex space-x-3 border-b border-gray-800"
          >
            <div className="flex items-center pl-2">
              <div className="w-14 h-14 rounded-full relative">
                <Image
                  src={profileImage}
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
            userName={userName}
            tweetId={tweetId}
            profileImage={profileImage}
            setIsReplyModalOpen={setShowReplyTab}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default TweetReplyContainer;
