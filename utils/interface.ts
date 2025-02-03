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

export interface AllBookmarksProps {
  userId: string;
  id: string;
  tweetId: string;
  createdAt: Date;
  commentId: string | null;
  tweet: {
    id: string;
    text: string;
    authorId: string;
    image: string | null;
    profileImage: string;
    createdAt: Date;
  };
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
  bookmark: {
    userId: string;
    id: string;
    tweetId: string;
    createdAt: Date;
    commentId: string | null;
    tweet: {
      id: string;
      text: string;
      authorId: string;
      image: string | null;
      profileImage: string;
      createdAt: Date;
    };
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

export interface UserProps {
  user: {
    name?: string;
    userName?: string;
    profileImage: string;
  };
}

export interface TweetContainerProps {
  authorId: string;
  profileImage: string;
  userName: string;
  name: string;
  tweetImage: string | null;
  tweetTxt: string;
  tweetId: string;
  isLiked: boolean | undefined;
  likeCount: number;
  isBookmarked: boolean | undefined;
  commentCount: number;
}
