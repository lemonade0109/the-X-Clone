"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

const WhoToFollowBar = () => {
  return (
    <Card className="border border-gray-800">
      <CardHeader>
        <CardTitle>
          <h4 className="font-extrabold text-2xl px-4">Who to Follow</h4>
        </CardTitle>
      </CardHeader>

      <CardContent className=" px-9">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            className="flex items-center space-x-12 hover:bg-white/5 transition duration-200 p-4 last:rounded-b-xl"
            key={i}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-neutral-600 rounded-full"></div>

              <div className="flex flex-col space-y-1 w-auto">
                <div className="font-bold text-md">Other User</div>
                <div className="text-gray-500">@otheruser</div>
              </div>
            </div>

            <div className="">
              <Button className="px-6 py-4 text-lg font-bold rounded-full">
                Follow
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WhoToFollowBar;
