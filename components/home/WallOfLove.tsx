"use client";

import Link from "next/link";

import { FaTwitter } from "react-icons/fa";

const WallOfLove = () => {
  return (
    <section className="border  border-t-0 border-primary/10 max-w-[60rem] w-[90%] mx-auto text-left relative overflow-hidden py-20  bg-homecards">
      <div className="flex flex-col gap-8 p-8 max-sm:p-4">
        <div className="text-center">
          <div className=" flex items-center justify-center flex-col gap-4">
            <FaTwitter className="text-primary text-3xl fill-[#01a3f2] " />
            <div>
              <h2 className="text-4xl font-bold mb-4">Wall of Love</h2>
              <p className="text-primary/70 text-lg mb-8">
                Join other developers who love HextaUI
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center text-center">
            <div className="text-center text-primary/70">
              <Link
                className="px-6 bg-gradient-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 "
                href="https://twitter.com/intent/tweet?text=I%20love%20HextaUI%20%F0%9F%92%96%0A%0Ahttps%3A%2F%2Fhextaui.com&url="
              >
                Share your experience
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WallOfLove;
