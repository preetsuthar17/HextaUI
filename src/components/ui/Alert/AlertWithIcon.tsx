"use client";

import { Alert, type AlertProps } from "../alert";
import { type LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  AlertCircle,
  Shield,
  Bell,
  Star,
  Zap,
  Heart,
  Settings,
  User,
  Mail,
  Server,
  CreditCard,
  Trophy,
  HardDrive,
} from "lucide-react";

// Map of icon names to actual components
const iconMap = {
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  AlertCircle,
  Shield,
  Bell,
  Star,
  Zap,
  Heart,
  Settings,
  User,
  Mail,
  Server,
  CreditCard,
  Trophy,
  HardDrive,
} as const;

export type IconName = keyof typeof iconMap;

interface AlertWithIconProps extends Omit<AlertProps, "icon"> {
  iconName?: IconName;
  icon?: LucideIcon;
}

export function AlertWithIcon({
  iconName,
  icon,
  ...props
}: AlertWithIconProps) {
  // Priority: custom icon > iconName > no icon
  let IconComponent: LucideIcon | undefined;

  if (icon) {
    IconComponent = icon;
  } else if (iconName) {
    IconComponent = iconMap[iconName];
  }

  return <Alert icon={IconComponent} {...props} />;
}
