import React from "react";

export default async function page({
  params,
}: {
  params: { searchItem: string };
}) {
  console.log(params.searchItem);
  return <div>page</div>;
}
