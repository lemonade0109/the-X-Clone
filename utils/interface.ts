export interface TweetProps {
  tweet: {
    id: string;
    text: string;
    authorId: string;
    image: string | null;
    profileImage: string;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      userName: string;
      profileImage: string;
      bio: string;
      location: string;
      website: string;
      createdAt: Date;
      updatedAt: Date;
      dob: Date;
    };
  };
  id?: string;
}

export interface TweetReplyProps extends TweetProps {
  isLiked: boolean | null;
  isBookmarked: boolean | null;
  isRetweeted: boolean | null;
  likeCount: number;
  retweetCount: number;
  tweetCommentCount: number;
  comments?: CommentProps[];
}

export interface CommentProps {
  // tweet: TweetProps["tweet"];
  comments: {
    id: string;
    tweetId: string;
    text: string;
    createdAt: Date;
    author: {
      id: string;
      name: string;
      userName: string;
      profileImage: string;
      bio: string;
      location: string;
      website: string;
      createdAt: Date;
      updatedAt: Date;
      dob: Date;
    };
    likes: LikeProps[];
    bookmarks?: BookmarkProps[];
    reply: CommentReply[];
  };
}

export interface BookmarkProps {
  userId: string;
  id: string;
  tweetId: string;
  createdAt: Date;
  commentId: string | null;
}

export interface LikeProps {
  userId: string;
  id: string;
  tweetId: string;
  createdAt: Date;
  commentId: string | null;
}

export interface CommentReply {
  id: string;
  replyId: string;
}
