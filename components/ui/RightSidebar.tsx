import React from "react";

import TrendsBar from "./TrendsBar";
import WhoToFollowBar from "./WhoToFollowBar";

const RightSidebar = () => {
  return (
    <section className=" bg-black hidden md:inline justify-center py-4 ">
      <div className=" container px-4 space-y-5 ">
        <TrendsBar />
        <WhoToFollowBar />
      </div>
    </section>
  );
};

export default RightSidebar;
