import React from "react";

const HeaderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-8 border-b w-full h-16 border-gray-800 bg-transparent/85  px-4 py-2 sticky top-0 z-10 left-0">
      {children}
    </div>
  );
};

export default HeaderContainer;
