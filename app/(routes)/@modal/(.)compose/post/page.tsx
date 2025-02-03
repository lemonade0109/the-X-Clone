import ComposepostModal from "@/components/ui/composepostModal";
import React from "react";
import { fetchUserProfileImage } from "@/lib/actions/profile/profileActions";

export default async function ComposePostPage() {
  const user = await fetchUserProfileImage();
  if (!user) return null;
  return <ComposepostModal user={user} />;
}
