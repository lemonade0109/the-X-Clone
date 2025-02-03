import React from "react";
import ComposepostModal from "@/components/ui/composepostModal";
import { fetchUserProfileImage } from "@/lib/actions/profile/profileActions";

export default async function ComposePostPage() {
  const user = await fetchUserProfileImage();
  if (!user) return null;
  return (
    <React.Fragment>
      <ComposepostModal user={user} />;
    </React.Fragment>
  );
}
