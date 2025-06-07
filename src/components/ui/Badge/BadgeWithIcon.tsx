"use client";

import { Badge, type BadgeProps } from "./index";
import {
  Star,
  CheckCircle,
  AlertTriangle,
  Zap,
  ArrowRight,
  Heart,
  X,
  Check,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Circle,
  Square,
  Triangle,
} from "lucide-react";

// Map of icon names to actual components
const iconMap = {
  Star,
  CheckCircle,
  AlertTriangle,
  Zap,
  ArrowRight,
  Heart,
  X,
  Check,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Circle,
  Square,
  Triangle,
} as const;

export type IconName = keyof typeof iconMap;

interface BadgeWithIconProps extends Omit<BadgeProps, "icon"> {
  iconName?: IconName;
}

export function BadgeWithIcon({ iconName, ...props }: BadgeWithIconProps) {
  const IconComponent = iconName ? iconMap[iconName] : undefined;

  return <Badge icon={IconComponent} {...props} />;
}
