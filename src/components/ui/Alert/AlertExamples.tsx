"use client";

import { Alert } from "../alert";
import {
  Wifi,
  Database,
  Rocket,
  Coffee,
  Code,
  Sparkles,
  Heart,
  TrendingUp,
  Lock,
  Calendar,
  Bell,
  Trophy,
  HardDrive,
  Info,
  CheckCircle,
  AlertTriangle,
  X,
  CreditCard,
  Shield,
  Server,
} from "lucide-react";

export function BasicAlertExamples() {
  return (
    <div className="space-y-4">
    <Alert icon={Code} variant="info" title="Code Review Ready">
      Your pull request is ready for code review by the team.
    </Alert>
    <Alert icon={Sparkles} variant="success" title="Feature Unlocked">
      Congratulations! You've unlocked premium features.
    </Alert>
    <Alert icon={TrendingUp} variant="info" title="Performance Improved">
      Your application performance has increased by 40% this month.
    </Alert>
    <Alert icon={Lock} variant="warning" title="Security Alert">
      We detected unusual login activity. Please verify your account.
    </Alert>
    <Alert icon={Calendar} variant="default" title="Meeting Reminder">
      Your team standup meeting starts in 15 minutes.
    </Alert>
  </div>
  );
}
