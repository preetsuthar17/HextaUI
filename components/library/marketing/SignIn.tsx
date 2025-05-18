"use client";

import { LogIn, Mail, Lock } from "lucide-react";
import React, { useState } from "react";
import { Particles } from "@/components/library/animation/Particles";

const SignIn1 = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    alert("Sign in successful! (Demo)");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] relative overflow-hidden w-full rounded-xl py-20">
      <div className="w-screen h-screen absolute">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_#121212_50%)] z-10" />
        <Particles quantity={1000} />
      </div>
      {/* Centered glass card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-radial-[at_25%_25%] from-zinc-700/60 to-zinc-900/60 to-75% backdrop-blur-sm  shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-6 shadow-lg">
          <img src="http://hextaui.com/logo.svg" />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          HextaUI
        </h2>
        {/* Form */}
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex flex-col gap-3">
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full px-5 py-3 rounded-xl  bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full px-5 py-3 rounded-xl  bg-white/10 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <div className="text-sm text-red-400 text-left">{error}</div>
            )}
          </div>
          <hr className="opacity-10" />
          <div>
            <button
              onClick={handleSignIn}
              className="w-full bg-white/10 text-white font-medium px-5 py-3 rounded-full shadow hover:bg-white/20 transition mb-3  text-sm"
            >
              Sign in
            </button>
            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#232526] to-[#2d2e30] rounded-full px-5 py-3 font-medium text-white shadow hover:brightness-110 transition mb-2 text-sm">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
            <div className="w-full text-center mt-2">
              <span className="text-xs text-gray-400">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className="underline text-white/80 hover:text-white"
                >
                  Sign up, it&apos;s free!
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* User count and avatars */}
      <div className="relative z-10 mt-12 flex flex-col items-center text-center px-5">
        <p className="text-gray-400 text-sm mb-2">
          Join <span className="font-medium text-white">thousands</span> of
          developers who are already using HextaUI.
        </p>
        <div className="flex">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/men/54.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const SignIn2 = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isPwdFocused, setIsPwdFocused] = React.useState(false);
  const [isPwdTyping, setIsPwdTyping] = React.useState(false);
  const [spyEye, setSpyEye] = React.useState<null | 0 | 1>(null);

  const maxEmailLength = 24;
  const emailProgress = Math.min(email.length / maxEmailLength, 1);

  // Handle eyelid animation timers
  React.useEffect(() => {
    let spyTimeout: NodeJS.Timeout;
    if (isPwdFocused && password.length > 0 && isPwdTyping) {
      setSpyEye(null);
      spyTimeout = setTimeout(() => {
        setIsPwdTyping(false);
        setSpyEye(Math.random() > 0.5 ? 0 : 1);
      }, 2000);
    }
    return () => clearTimeout(spyTimeout);
  }, [isPwdFocused, password, isPwdTyping]);

  // Reset eyelids
  React.useEffect(() => {
    if (!isPwdFocused || password.length === 0) {
      setSpyEye(null);
      setIsPwdTyping(false);
    }
  }, [isPwdFocused, password]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please enter both email and password!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }
    setError("");
    alert("Sign in successful! (Demo)");
  };

  const eyesClosed =
    isPwdFocused && password.length > 0 && (isPwdTyping || spyEye === null);
  const eyePop = isPwdFocused && password.length > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-6 sm:p-8 flex flex-col items-center cartoonish-signin overflow-hidden">
        {/* Eyes */}
        <div className="flex justify-center mb-4">
          {[0, 1].map((idx) => {
            let lidDown = false;
            let peek = false;

            if (password.length === 0 || !isPwdFocused) {
              lidDown = false;
            } else if (eyesClosed) {
              lidDown = true;
            } else if (spyEye !== null) {
              lidDown = spyEye !== idx;
              peek = spyEye === idx;
            }

            const lidTransform = lidDown
              ? "translateY(0%)"
              : peek
                ? "translateY(-60%)"
                : "translateY(-100%)";

            return (
              <div
                key={idx}
                className="relative w-12 h-12 mx-2 flex items-center justify-center transition-transform duration-300 overflow-hidden"
                style={{
                  transitionTimingFunction: "cubic-bezier(.4,2,.6,1)",
                  transform: eyePop ? "scale(1.25)" : "scale(1)",
                }}
              >
                {/* Eye white */}
                <div className="absolute left-0 bottom-0 w-12 h-12 bg-white border-4 border-black" />

                {/* Pupil */}
                <div
                  className="absolute"
                  style={{
                    left: 6 + emailProgress * 16,
                    bottom: 6,
                    width: 20,
                    height: 20,
                    background: "#000",
                    borderRadius: "50%",
                    transition: "left 0.3s cubic-bezier(.4,2,.6,1)",
                  }}
                />

                {/* Highlight */}
                <div
                  className="absolute"
                  style={{
                    left: 12 + emailProgress * 16,
                    bottom: 12,
                    width: 8,
                    height: 8,
                    background: "#fff",
                    borderRadius: "50%",
                    transition: "left 0.3s cubic-bezier(.4,2,.6,1)",
                  }}
                />

                {/* Eyelid */}
                <div
                  className="absolute left-0 top-0 w-12 h-12 bg-black border-b-4 border-yellow z-10"
                  style={{
                    transform: lidTransform,
                    transition: "transform 0.4s cubic-bezier(.4,2,.6,1)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-black mb-1 tracking-wider font-[Comic Sans MS,Comic Sans,cursive]">
          Sign In
        </h2>
        <p className="text-base text-pink-600 font-bold mb-6 text-center font-[Comic Sans MS,Comic Sans,cursive]">
          Welcome back! Please sign in to continue.
        </p>

        {/* Form */}
        <div className="w-full flex flex-col gap-4 mb-2">
          <input
            placeholder="Email"
            type="email"
            value={email}
            className="w-full px-4 py-2 border-2 border-black bg-yellow-100 text-black text-base font-bold focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            className="w-full px-4 py-2 border-2 border-black bg-blue-100 text-black text-base font-bold focus:outline-none focus:ring-2 focus:ring-pink-400"
            onFocus={() => {
              setIsPwdFocused(true);
              setIsPwdTyping(true);
            }}
            onBlur={() => setIsPwdFocused(false)}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPwdTyping(true);
            }}
          />
          {error && (
            <div className="text-sm text-red-500 text-left font-bold">
              {error}
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleSignIn}
          className="w-full bg-pink-400 border-2 border-black text-white font-extrabold py-2 mt-2 shadow-[4px_4px_0_0_#000] hover:bg-pink-500 transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

const SignIn3 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    alert("Sign in successful! (Demo)");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white rounded-xl  z-1">
      <div className="w-full max-w-sm bg-linear-180 from-sky-50/50 to-white  rounded-3xl shadow-xl/10 p-8 flex flex-col items-center border border-blue-100 text-black">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg/5">
          <LogIn className="w-7 h-7 text-black" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">
          Sign in with email
        </h2>
        <p className="text-gray-500 text-sm mb-6 text-center">
          Make a new doc to bring your words, data, and teams together. For free
        </p>
        <div className="w-full flex flex-col gap-3 mb-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <input
              placeholder="Email"
              type="email"
              value={email}
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm font-medium"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </span>
            <input
              placeholder="Password"
              type="password"
              value={password}
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-50 text-black text-sm font-medium"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer text-xs select-none"></span>
          </div>
          <div className="w-full flex justify-end">
            <button className="text-xs  hover:underline">
              Forgot password?
            </button>
          </div>
          {error && (
            <div className="text-sm text-red-500 text-left">{error}</div>
          )}
        </div>
        <button
          onClick={handleSignIn}
          className="w-full bg-gradient-to-b from-gray-700 to-gray-900 text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-4 mt-2"
        >
          Get Started
        </button>
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
          <span className="mx-2 text-xs text-gray-400">Or sign in with</span>
          <div className="flex-grow border-t border-dashed border-gray-200"></div>
        </div>
        <div className="flex gap-3 w-full justify-center mt-2">
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow">
            <img
              src="https://www.svgrepo.com/show/511330/apple-173.svg"
              alt="Apple"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const SignIn4 = () => {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContinue = () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    alert("Continue with email! (Demo)");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 w-full ">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-[0_6px_32px_0_rgba(0,0,0,0.07)] border-2 border-blue-100 p-6 sm:p-8 flex flex-col items-center">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-black text-base mb-2 focus:outline-none focus:ring-2 focus:ring-blue-200 font-medium"
        />
        {error && (
          <div className="text-sm text-red-500 text-left w-full mb-2">
            {error}
          </div>
        )}
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-b from-blue-950 to-gray-900 text-white font-semibold py-3 rounded-xl shadow hover:brightness-110 transition text-base mt-1 cursor-pointer px-4"
        >
          Continue with email
        </button>{" "}
        <div className="flex items-center w-full my-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-2 text-xs text-gray-400 font-semibold tracking-wide">
            OR
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-xl py-3 font-semibold text-base shadow hover:bg-blue-100 transition mb-4 text-blue-700 cursor-pointer px-4">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export { SignIn1, SignIn2, SignIn3, SignIn4 };
