"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { LucideIcon } from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Zap, User, Sparkles, Mail } from "lucide-react";

export type TabItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  color: string;
};

export type ExpandableTabsProps = {
  tabs: TabItem[];
  defaultTabId?: string;
  className?: string;
};

export const ExpandableTabs = ({
  tabs,
  defaultTabId = tabs[0]?.id,
  className,
}: ExpandableTabsProps) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId);

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-ele bg-accent ",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        const Icon = tab.icon;

        return (
          <motion.div
            key={tab.id}
            layout
            className={cn(
              "flex items-center justify-center  rounded-ele cursor-pointer overflow-hidden h-[50px]",
              tab.color,
              isActive ? "flex-1" : "flex-none",
            )}
            onClick={() => setActiveTabId(tab.id)}
            initial={false}
            animate={{
              width: isActive ? 140 : 50,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          >
            <motion.div
              className="flex items-center justify-center h-[50px] aspect-square"
              initial={{ filter: "blur(10px)" }}
              animate={{ filter: "blur(0px)" }}
              exit={{ filter: "blur(10px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Icon className="flex-shrink-0 w-6 h-6 text-white aspect-square" />
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    className="ml-3 text-white font-medium max-sm:hidden"
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ originX: 0 }}
                  >
                    {tab.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

// DEMO

export const ExpandableTabsDemo = () => {
  const tabs: TabItem[] = [
    {
      id: "important",
      icon: Zap,
      label: "Important",
      color: "bg-blue-600",
    },
    {
      id: "profile",
      icon: User,
      label: "Profile",
      color: "bg-pink-500",
    },
    {
      id: "features",
      icon: Sparkles,
      label: "Features",
      color: "bg-pink-600",
    },
    {
      id: "messages",
      icon: Mail,
      label: "Messages",
      color: "bg-purple-500",
    },
  ];
  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <ExpandableTabs tabs={tabs} defaultTabId="important" />
      </div>
    </>
  );
};
