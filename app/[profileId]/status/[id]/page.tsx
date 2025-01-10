import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  console.log(params);
  return <div>image page</div>;
}
