import { fetchSearchedTweetsAction } from "@/lib/actions/tweet/tweetActions";
import React from "react";

export default async function SearchPage({
  params,
}: {
  params: { searchItem: string };
}) {
  const { searchItem } = await params;

  const searchResult = await fetchSearchedTweetsAction({
    searchTerm: searchItem,
  });
  console.log(searchResult);
  return <div>page</div>;
}
