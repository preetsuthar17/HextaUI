"use client";

import { Alert } from "./alert";
import { AlertWithIcon } from "./AlertWithIcon";

export function BasicAlertExamples() {
  return (
    <div className="space-y-4">
      <Alert>
        <strong>Default Alert:</strong> This is a basic alert message.
      </Alert>
      <Alert variant="destructive">
        <strong>Error:</strong> Something went wrong. Please try again.
      </Alert>
      <Alert variant="warning">
        <strong>Warning:</strong> This action cannot be undone.
      </Alert>
      <Alert variant="success">
        <strong>Success:</strong> Your changes have been saved.
      </Alert>
      <Alert variant="info">
        <strong>Info:</strong> New features are now available.
      </Alert>
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
      <AlertWithIcon
        iconName="Info"
        variant="info"
        title="New Features Available"
      >
        We've added new collaboration tools to help you work better with your
        team.
      </AlertWithIcon>
      <AlertWithIcon
        iconName="CheckCircle"
        variant="success"
        title="Payment Successful"
      >
        Your subscription has been renewed for another year.
      </AlertWithIcon>
      <AlertWithIcon
        iconName="AlertTriangle"
        variant="warning"
        title="Storage Almost Full"
      >
        You've used 95% of your storage space. Consider upgrading your plan.
      </AlertWithIcon>
      <AlertWithIcon
        iconName="XCircle"
        variant="destructive"
        title="Action Failed"
      >
        Could not complete the requested action. Please try again later.
      </AlertWithIcon>
      <AlertWithIcon iconName="Bell" variant="default" title="Reminder">
        Your meeting with the design team starts in 15 minutes.
      </AlertWithIcon>
    </div>
  );
}

export function DismissibleAlertExamples() {
  const handleDismiss = (message: string) => {
    console.log(message);
  };

  return (
    <div className="space-y-4">
      <AlertWithIcon
        iconName="Bell"
        variant="info"
        title="Notification"
        dismissible
        onDismiss={() => handleDismiss("Alert dismissed")}
      >
        You have 3 new messages in your inbox.
      </AlertWithIcon>
      <AlertWithIcon
        iconName="Trophy"
        variant="success"
        title="Achievement Unlocked"
        dismissible
        onDismiss={() => handleDismiss("Achievement dismissed")}
      >
        Congratulations! You've completed 100 tasks this month.
      </AlertWithIcon>
      <AlertWithIcon
        iconName="HardDrive"
        variant="warning"
        title="Storage Warning"
        dismissible
        onDismiss={() => handleDismiss("Storage warning dismissed")}
      >
        Your storage is almost full. Consider upgrading your plan.
      </AlertWithIcon>
    </div>
  );
}

export function AlertSizesExamples() {
  return (
    <div className="space-y-4">
      <Alert className="text-xs p-3">
        <strong>Small Alert:</strong> Compact alert for minimal space.
      </Alert>
      <Alert>
        <strong>Default Alert:</strong> Standard size for most use cases.
      </Alert>
      <Alert className="text-base p-5">
        <strong>Large Alert:</strong> Prominent alert for important messages.
      </Alert>
    </div>
  );
}

export function CustomStyledAlertExamples() {
  return (
    <div className="space-y-4">
      <Alert className="rounded-xl border-2">
        <strong>Rounded Alert:</strong> Custom border radius styling.
      </Alert>
      <Alert variant="info" className="border-dashed">
        <strong>Dashed Border:</strong> Alert with dashed border style.
      </Alert>
      <Alert variant="success" className="shadow-lg">
        <strong>With Shadow:</strong> Alert with enhanced shadow.
      </Alert>
      <Alert className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-800 dark:from-purple-950/20 dark:to-pink-950/20 dark:border-purple-800 dark:text-purple-200">
        <strong>Gradient Background:</strong> Custom gradient styling.
      </Alert>
    </div>
  );
}

export function RealWorldAlertExamples() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">System Status</h4>
        <AlertWithIcon
          iconName="Server"
          variant="success"
          title="All Systems Operational"
        >
          All services are running normally. Last updated 2 minutes ago.
        </AlertWithIcon>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Account Security</h4>
        <AlertWithIcon
          iconName="Shield"
          variant="warning"
          title="Password Expiring Soon"
        >
          Your password will expire in 3 days. Update it now to maintain account
          security.
        </AlertWithIcon>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Billing Information</h4>
        <AlertWithIcon
          iconName="CreditCard"
          variant="destructive"
          title="Payment Method Required"
        >
          Your trial ends in 2 days. Add a payment method to continue using our
          services.
        </AlertWithIcon>
      </div>
    </div>
  );
}
