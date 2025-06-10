"use client";

import * as React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  AlertTriangle,
  Zap,
  ArrowRight,
  Heart,
} from "lucide-react";

// Map of icon names to actual components for examples
const iconMap = {
  Calendar: CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  AlertTriangle,
  Zap,
  ArrowRight,
  Heart,
} as const;

export type IconName = keyof typeof iconMap;

interface CalendarWithIconProps {
  iconName?: IconName;
  children?: React.ReactNode;
}

export function CalendarWithIcon({
  iconName,
  children,
}: CalendarWithIconProps) {
  const IconComponent = iconName ? iconMap[iconName] : undefined;

  return (
    <div className="flex items-center gap-2">
      {IconComponent && <IconComponent size={16} />}
      {children}
    </div>
  );
}
