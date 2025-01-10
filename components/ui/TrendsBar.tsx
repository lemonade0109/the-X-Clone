"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

interface ArticleProps {
  title?: string;
  url?: string;
  urlToImage?: string;
  description?: string;
  content?: string;
  publishedAt?: string;
  source?: {
    id: string;
    name: string;
  };
  author?: string;
}

const TrendsBar = () => {
  const [news, setNews] = useState([]);
  const [articleNum, setArticleNum] = useState(3);

  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  return (
    <Card className="border border-gray-800">
      <CardHeader>
        <CardTitle>
          <h4 className="font-extrabold text-2xl px-4">
            What&apos;s happening
          </h4>
        </CardTitle>
      </CardHeader>

      <CardContent className=" px-9">
        {news.slice(0, articleNum).map((article: ArticleProps) => (
          <div key={article.url}>
            <a href={article.url} target="_blank">
              <div className="container flex items-center px-6 py-2 hover:bg-white/5  transition duration-200 last:rounded-b-xl">
                <div className="space-y-0.5">
                  <h6 className="text-sm font-bold">{article.title}</h6>
                  <p className="text-xs font-medium text-gray-500">
                    {article.source?.name}
                  </p>
                </div>

                <img
                  src={article.urlToImage!}
                  width={50}
                  className="rounded-xl"
                />
              </div>
            </a>
          </div>
        ))}
      </CardContent>

      <CardFooter>
        <button
          onClick={() => setArticleNum(articleNum + 3)}
          className="text-sm text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Load more
        </button>
      </CardFooter>
    </Card>
  );
};

export default TrendsBar;
