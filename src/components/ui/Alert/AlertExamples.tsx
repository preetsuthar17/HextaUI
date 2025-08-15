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
      <Alert>This is a basic alert message.</Alert>
      <Alert variant="destructive">
        Something went wrong. Please try again.
      </Alert>
      <Alert variant="warning">This action cannot be undone.</Alert>
      <Alert variant="success">Your changes have been saved.</Alert>
      <Alert variant="info">New features are now available.</Alert>
    </div>
  );
}

export function AlertWithTitleExamples() {
  return (
    <div className="space-y-4">
      <Alert title="System Update">
        A new version of the application is available. Please restart to apply
        updates.
      </Alert>
      <Alert variant="destructive" title="Connection Failed">
        Unable to connect to the server. Please check your internet connection.
      </Alert>
      <Alert variant="warning" title="Data Loss Warning">
        You have unsaved changes. Leaving this page will discard your work.
      </Alert>
      <Alert variant="success" title="Upload Complete">
        Your files have been successfully uploaded to the cloud storage.
      </Alert>
      <Alert variant="info" title="Feature Preview">
        Try out our new dashboard features in beta mode.
      </Alert>
    </div>
  );
}

export function AlertWithIconExamples() {
  return (
    <div className="space-y-4">
      {/* Using predefined icon names */}
      <Alert icon={Info} variant="info" title="New Features Available">
        We've added new collaboration tools to help you work better with your
        team.
      </Alert>
      <Alert icon={CheckCircle} variant="success" title="Payment Successful">
        Your subscription has been renewed for another year.
      </Alert>
      <Alert icon={AlertTriangle} variant="warning" title="Storage Almost Full">
        You've used 95% of your storage space. Consider upgrading your plan.
      </Alert>
      <Alert icon={X} variant="destructive" title="Action Failed">
        Could not complete the requested action. Please try again later.
      </Alert>

      {/* Using custom icon components */}
      <Alert icon={Wifi} variant="info" title="Network Connected">
        You are now connected to the secure network.
      </Alert>
      <Alert icon={Database} variant="warning" title="Database Backup Required">
        It's been 7 days since your last backup. Consider backing up your data.
      </Alert>
      <Alert icon={Rocket} variant="success" title="Deployment Successful">
        Your application has been deployed to production successfully.
      </Alert>
      <Alert icon={Coffee} variant="default" title="Break Time">
        You've been coding for 2 hours. Time for a coffee break!
      </Alert>
    </div>
  );
}

export function AlertWithCustomIconsExamples() {
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

export function DismissibleAlertExamples() {
  const handleDismiss = (message: string) => {
    console.log(message);
  };

  return (
    <div className="space-y-4">
      <Alert
        icon={Bell}
        variant="info"
        title="Notification"
        dismissible
        onDismiss={() => handleDismiss("Alert dismissed")}
      >
        You have 3 new messages in your inbox.
      </Alert>
      <Alert
        icon={Trophy}
        variant="success"
        title="Achievement Unlocked"
        dismissible
        onDismiss={() => handleDismiss("Achievement dismissed")}
      >
        Congratulations! You've completed 100 tasks this month.
      </Alert>
      <Alert
        icon={HardDrive}
        variant="warning"
        title="Storage Warning"
        dismissible
        onDismiss={() => handleDismiss("Storage warning dismissed")}
      >
        Your storage is almost full. Consider upgrading your plan.
      </Alert>

      {/* Custom icons with dismissible */}
      <Alert
        icon={Heart}
        variant="success"
        title="Thank You!"
        dismissible
        onDismiss={() => handleDismiss("Thank you dismissed")}
      >
        Thank you for being an awesome user! Your feedback helps us improve.
      </Alert>
    </div>
  );
}

export function AlertSizesExamples() {
  return (
    <div className="space-y-4">
      <Alert className="text-xs p-3">Compact alert for minimal space.</Alert>
      <Alert>Standard size for most use cases.</Alert>
      <Alert className="text-base p-5">
        Prominent alert for important messages.
      </Alert>
    </div>
  );
}

export function CustomStyledAlertExamples() {
  return (
    <div className="space-y-4">
      <Alert className="rounded-xl border-2">
        Custom border radius styling.
      </Alert>
      <Alert variant="info" className="border-dashed">
        Alert with dashed border style.
      </Alert>
      <Alert variant="success" className="">
        Alert with enhanced shadow.
      </Alert>
      <Alert className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-800 dark:from-purple-950/20 dark:to-pink-950/20 dark:border-purple-800 dark:text-purple-200">
        Custom gradient styling.
      </Alert>
    </div>
  );
}

export function RealWorldAlertExamples() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">System Status</h4>
        <Alert icon={Server} variant="success" title="All Systems Operational">
          All services are running normally. Last updated 2 minutes ago.
        </Alert>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Account Security</h4>
        <Alert icon={Shield} variant="warning" title="Password Expiring Soon">
          Your password will expire in 3 days. Update it now to maintain account
          security.
        </Alert>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Billing Information</h4>
        <Alert
          icon={CreditCard}
          variant="destructive"
          title="Payment Method Required"
        >
          Your trial ends in 2 days. Add a payment method to continue using our
          services.
        </Alert>
      </div>
    </div>
  );
}
