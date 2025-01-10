import { fetchProfileDetails } from "@/lib/actions/profile/profileActions";
import React from "react";

export default async function page({
  params,
}: {
  params: { profileId: string };
}) {
  const user = await fetchProfileDetails((await params).profileId);
  return (
    <div>
      Profile page
      {user?.name}
    </div>
  );
}
