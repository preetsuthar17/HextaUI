"use client";

import React from "react";
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
} from "../skeleton";

// Basic Skeleton Examples
export function BasicSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Text Lines</h3>
        <SkeletonText className="w-3/4" />
        <SkeletonText className="w-1/2" />
        <SkeletonText className="w-5/6" />
      </div>
    </div>
  );
}

// Avatar Skeletons
export function AvatarSkeletons() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Avatar Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="default" />
          <SkeletonAvatar size="lg" />
          <SkeletonAvatar size="xl" />
          <SkeletonAvatar size="2xl" />
        </div>
      </div>
    </div>
  );
}

// Button Skeletons
export function ButtonSkeletons() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <SkeletonButton size="sm" />
          <SkeletonButton size="default" />
          <SkeletonButton size="lg" />
        </div>
      </div>
    </div>
  );
}

// Card Skeletons
export function CardSkeletons() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Card Layouts</h3>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard showImage={false} />
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          <SkeletonCard showFooter={false} />
          <SkeletonCard showHeader={false} />
          <SkeletonCard showImage={false} showFooter={false} />
        </div>
      </div>
    </div>
  );
}

// Complete Profile Card Skeleton
export function ProfileCardSkeleton() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Profile Card</h3>
      <div className="rounded-lg border p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <SkeletonAvatar size="lg" />
          <div className="space-y-2 flex-1 w-full">
            <SkeletonText className="w-full sm:w-1/3" />
            <SkeletonText className="w-3/4 sm:w-1/2" size="sm" />
          </div>
        </div>
        <div className="space-y-2">
          <SkeletonText className="w-full" />
          <SkeletonText className="w-4/5" />
          <SkeletonText className="w-3/5" />
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <SkeletonButton size="sm" />
          <SkeletonButton size="sm" />
        </div>
      </div>
    </div>
  );
}

// Article List Skeleton
export function ArticleListSkeleton() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Article List</h3>
      <div className="space-y-4 sm:space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Skeleton className="w-full sm:w-16 h-32 sm:h-16 rounded-lg" />
            <div className="flex-1 space-y-2">
              <SkeletonText className="w-full sm:w-3/4" />
              <SkeletonText className="w-4/5 sm:w-1/2" size="sm" />
              <div className="flex flex-wrap items-center gap-2">
                <SkeletonAvatar size="sm" />
                <SkeletonText className="w-20" size="sm" />
                <SkeletonText className="w-16" size="sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Custom Skeleton Variants
export function CustomSkeletonVariants() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Custom Variants</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Circle</p>
          <Skeleton variant="circle" className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Secondary</p>
          <Skeleton variant="secondary" className="w-full h-6" />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Custom Size</p>
          <Skeleton width={200} height={100} />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">No Shimmer</p>
          <Skeleton shimmer={false} className="w-full h-6" />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Slow Animation</p>
          <Skeleton duration={4} className="w-full h-6" />
        </div>
      </div>
    </div>
  );
}

// Data Table Skeleton
export function DataTableSkeleton() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Data Table</h3>
      <div className="rounded-md border overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="border-b p-4">
            <div className="grid grid-cols-4 gap-4 items-center">
              <SkeletonText size="sm" />
              <SkeletonText size="sm" />
              <SkeletonText size="sm" />
              <SkeletonText size="sm" />
            </div>
          </div>
          {/* Rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-b last:border-b-0 p-4">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <SkeletonAvatar size="sm" />
                  <SkeletonText className="w-20" size="sm" />
                </div>
                <div className="flex justify-center">
                  <SkeletonText className="w-16" size="sm" />
                </div>
                <div className="flex justify-center">
                  <SkeletonText className="w-16" size="sm" />
                </div>
                <div className="flex justify-center">
                  <SkeletonButton size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Blog Post Skeleton
export function BlogPostSkeleton() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Blog Post</h3>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="space-y-3 sm:space-y-4">
          <SkeletonText className="w-full sm:w-4/5" size="xl" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <SkeletonAvatar size="sm" />
            <div className="space-y-1">
              <SkeletonText className="w-24" size="sm" />
              <SkeletonText className="w-20" size="sm" />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <SkeletonCard className="h-48 sm:h-64" />

        {/* Content */}
        <div className="space-y-2 sm:space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonText key={i} className={i === 5 ? "w-3/4" : "w-full"} />
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
