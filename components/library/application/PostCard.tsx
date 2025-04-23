"use client";

import { FaRegPaperPlane } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

import Image from "next/image";
import { useState } from "react";

export const PostCard = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    // your post like logic
    setLiked(!liked);
  };

  const handleBookmark = () => {
    // your post bookmark logic
    setBookmarked(!bookmarked);
  };

  return (
    <>
      <div className="p-4 rounded-2xl border border-primary/10 shadow-xs border-opacity-10 bg-secondary/50 text-secondary-foreground w-full flex flex-col gap-4 max-w-[30rem] m-4 text-sm ">
        <div className="flex items-center gap-4 card-header  justify-between">
          <div className="flex items-center  justify-center  gap-4">
            <div className="flex items-center">
              <img
                width={35}
                height={35}
                src="https://i.imgur.com/MUjzWdu.png"
                className="rounded-full"
                alt="HextaStudio"
              />
            </div>
            <div>
              <h3>
                HextaStudio
                <div className="flex gap-2 items-center justify-center opacity-70">
                  <small>@HextaStudio</small>
                  <span>·</span>
                  <small>7h</small>
                </div>
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="whitespace-pre-wrap">
            HextaUI - Gorgeous web components without any efforts! ✨<br />
            <br />
            🚀 HextaStudio launched their new product HextaUI which is a``
            collection of beautiful web components. <br />
            <br />
            🥳 Check it out now!
          </p>
          <Image
            width={1920}
            height={1080}
            src="https://i.imgur.com/zU3m0eC.png"
            alt="HextaUI"
            className="w-full auto max-w-full object-cover rounded-lg"
          />
        </div>
        <div className="flex justify-evenly">
          <button
            onClick={handleLike}
            className="flex items-center px-4 grow justify-center py-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-5 gap-3"
          >
            {liked ? <FaHeart color="red" /> : <FaRegHeart />}
            <span className="max-[488px]:hidden opacity-90 hover:opacity-100 transition-all text-[14px]">
              {liked ? "Liked" : "Like"}
            </span>
          </button>
          <button
            onClick={handleBookmark}
            className="flex items-center px-4 grow justify-center py-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-5 gap-3"
          >
            {bookmarked ? <FaBookmark color="#00bfff" /> : <FaRegBookmark />}
            <span className="max-[488px]:hidden opacity-90 hover:opacity-100 transition-all text-[14px]">
              {bookmarked ? "Saved" : "Save"}
            </span>
          </button>
          <button className="flex items-center px-4 grow justify-center py-2 rounded transition-all duration-300 hover:bg-white hover:bg-opacity-5 gap-3">
            <FaRegPaperPlane />{" "}
            <span className="max-[488px]:hidden opacity-90 hover:opacity-100 transition-all text-[14px]">
              Share
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
