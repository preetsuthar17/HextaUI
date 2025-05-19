"use client";

import {
  FaRegPaperPlane,
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";

export const PostCard: React.FC = () => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  const handleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

  return (
    <div className="m-4 max-w-[30rem] w-full rounded-4xl bg-background border border-primary/10 shadow-2xl/10 p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 card-header">
        <div className="flex items-center gap-4">
          <img
            src="https://i.imgur.com/MUjzWdu.png"
            alt="HextaStudio"
            width={35}
            height={35}
            className="rounded-full"
          />
          <div>
            <h3 className="flex flex-col">
              HextaStudio
              <span className="flex items-center gap-2 opacity-70 text-sm">
                <small>@HextaStudio</small>
                <span>·</span>
                <small>7h</small>
              </span>
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-4 flex flex-col gap-6">
        <p className="whitespace-pre-wrap">
          HextaUI – Gorgeous web components without any effort! ✨
          <br />
          <br />
          🚀 HextaStudio launched their new product HextaUI, a collection of
          beautiful web components.
          <br />
          <br />
          🥳 Check it out now!
        </p>
        <Image
          src="https://i.imgur.com/zU3m0eC.png"
          alt="HextaUI"
          width={1920}
          height={1080}
          className="max-w-full rounded-lg object-cover"
        />
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-evenly gap-2">
        <button
          onClick={handleLike}
          className="flex grow items-center justify-center gap-3 rounded-xl px-4 py-2 transition hover:bg-white/5"
        >
          {liked ? <FaHeart color="red" /> : <FaRegHeart />}
          <span className="hidden opacity-90 text-[14px] transition hover:opacity-100 max-[488px]:inline">
            {liked ? "Liked" : "Like"}
          </span>
        </button>

        <button
          onClick={handleBookmark}
          className="flex grow items-center justify-center gap-3 rounded-xl px-4 py-2 transition hover:bg-white/5"
        >
          {bookmarked ? <FaBookmark color="#00bfff" /> : <FaRegBookmark />}
          <span className="hidden opacity-90 text-[14px] transition hover:opacity-100 max-[488px]:inline">
            {bookmarked ? "Saved" : "Save"}
          </span>
        </button>

        <button className="flex grow items-center justify-center gap-3 rounded-xl px-4 py-2 transition hover:bg-white/5">
          <FaRegPaperPlane />
          <span className="hidden opacity-90 text-[14px] transition hover:opacity-100 max-[488px]:inline">
            Share
          </span>
        </button>
      </div>
    </div>
  );
};
