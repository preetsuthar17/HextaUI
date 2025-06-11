"use client";

import { Alert, type AlertProps } from "./alert";
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
} as const;

export type IconName = keyof typeof iconMap;

interface AlertWithIconProps extends Omit<AlertProps, "icon"> {
  iconName: IconName;
}

export function AlertWithIcon({ iconName, ...props }: AlertWithIconProps) {
  const IconComponent = iconMap[iconName];
  return <Alert icon={IconComponent} {...props} />;
}
