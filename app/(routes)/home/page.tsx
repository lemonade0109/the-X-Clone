import React from "react";

import Feeds from "@/components/home/Feeds";
import TweetsForm from "@/components/home/TweetsForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HeaderContainer from "@/components/ui/headerContainer";
import { fetchUserProfileImage } from "@/lib/actions/profile/profileActions";

export default async function HomePage() {
  const user = await currentUser();
  if (!user?.privateMetadata.hasProfile) {
    redirect("/profile");
  }

  const userProfile = await fetchUserProfileImage();

  return (
    <section className="flex flex-col w-full">
      <HeaderContainer>
        <h1 className="text-2xl mt-2 font-bold">Home</h1>
      </HeaderContainer>

      <div className="flex flex-col w-full">
        <TweetsForm userImage={userProfile?.profileImage} />
        <Feeds />
      </div>
    </section>
  );
}
