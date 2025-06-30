"use client";

import React from "react";

interface TrackedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  goal: string;
  children: React.ReactNode;
}

const TrackedLink = ({ goal, children, ...props }: TrackedLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window?.datafast) {
      console.log("TrackedLink clicked:", goal);
      window.datafast(goal);
    }
    if (props.onClick) props.onClick(e);
  };
  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
};

export default TrackedLink;
