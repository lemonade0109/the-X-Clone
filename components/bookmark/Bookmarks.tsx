"use client";
import React from "react";
import { fetchAllBookmarks } from "@/lib/actions/tweet/tweetActions";
import { BsSearch } from "react-icons/bs";
import EmptyList from "../ui/emptyList";
import Link from "next/link";
import { AllBookmarksProps } from "@/utils/interface";
import BookmarkContainer from "./BookmarkContainer";
import HeaderContainer from "../ui/headerContainer";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = React.useState<AllBookmarksProps[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");

  React.useEffect(() => {
    const fetchBookmarks = async () => {
      const bookmarks = await fetchAllBookmarks({ searchText });
      setBookmarks(bookmarks);
    };

    fetchBookmarks();
  }, [searchText]);

  if (bookmarks.length === 0) {
    return (
      <EmptyList
        className="max-w-xl flex items-center justify-center flex-col"
        heading={`No results for ${searchText}`}
      >
        <p className="mt-2 text-xl text-gray-500 max-w-md items-center">
          Try searching for something else, or check your{" "}
          <Link className="text-twitter" href={"/settings/search"}>
            Search settings
          </Link>{" "}
          to see if they’re protecting you from potentially sensitive content.
        </p>
      </EmptyList>
    );
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="">
      <HeaderContainer>
        <div className="py-4  bg-black ">
          <div className="group relative px-2">
            <label
              htmlFor="searchbox"
              className="absolute top-0 left-0 h-full flex items-center justify-center px-10 "
            >
              <BsSearch className="w-6 h-6 text-gray-500   group-focus-within:text-twitter" />
            </label>

            <input
              id="searchbox"
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleSearch}
              className="bg-neutral-900 text-lg w-full h-full px-20  py-4 outline-none  group-focus-within:border-twitter group-focus-within:border rounded-3xl"
            />
          </div>
        </div>
      </HeaderContainer>

      {bookmarks.map((bookmark) => (
        <BookmarkContainer key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
};

export default Bookmarks;
