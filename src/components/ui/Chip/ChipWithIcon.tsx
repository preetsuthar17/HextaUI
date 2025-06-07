"use client";

import { Chip, type ChipProps } from "./index";
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
  Tag,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Shield,
  Award,
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
  Tag,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Shield,
  Award,
} as const;

export type IconName = keyof typeof iconMap;

interface ChipWithIconProps extends Omit<ChipProps, "icon"> {
  iconName?: IconName;
}

export function ChipWithIcon({ iconName, ...props }: ChipWithIconProps) {
  const IconComponent = iconName ? iconMap[iconName] : undefined;

  return <Chip icon={IconComponent} {...props} />;
}
