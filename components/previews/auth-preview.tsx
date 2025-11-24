"use client";

import { useState } from "react";
import AuthAccountDelete from "@/registry/new-york/blocks/auth/auth-account-delete";
import AuthChangePassword from "@/registry/new-york/blocks/auth/auth-change-password";
import AuthEmailChange from "@/registry/new-york/blocks/auth/auth-email-change";
import AuthForgotPassword from "@/registry/new-york/blocks/auth/auth-forgot-password";
import AuthLoginForm from "@/registry/new-york/blocks/auth/auth-login-form";
import AuthMagicLink from "@/registry/new-york/blocks/auth/auth-magic-link";
import AuthOTPVerify from "@/registry/new-york/blocks/auth/auth-otp-verify";
import AuthPhoneVerify from "@/registry/new-york/blocks/auth/auth-phone-verify";
import AuthRecoveryCodes from "@/registry/new-york/blocks/auth/auth-recovery-codes";
import AuthResetPassword from "@/registry/new-york/blocks/auth/auth-reset-password";
import AuthSessionManager, {
  type Session,
} from "@/registry/new-york/blocks/auth/auth-session-manager";
import AuthSignupForm from "@/registry/new-york/blocks/auth/auth-signup-form";
import AuthSocialAccounts, {
  type SocialAccount,
} from "@/registry/new-york/blocks/auth/auth-social-accounts";
import AuthTwoFactorSetup from "@/registry/new-york/blocks/auth/auth-two-factor-setup";
import AuthTwoFactorVerify from "@/registry/new-york/blocks/auth/auth-two-factor-verify";
import AuthVerifyEmail from "@/registry/new-york/blocks/auth/auth-verify-email";

export default function AuthPreview() {
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [verifyEmailStatus, setVerifyEmailStatus] = useState<
    "pending" | "verifying" | "verified" | "expired" | "error"
  >("pending");
  const [magicLinkStatus, setMagicLinkStatus] = useState<
    "pending" | "sent" | "verified" | "expired"
  >("pending");
  const [phoneVerifyStatus, setPhoneVerifyStatus] = useState<
    "pending" | "sent" | "verifying" | "verified" | "expired" | "error"
  >("pending");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Example sessions data - using fixed dates to avoid Date.now() during render
  const exampleSessions: Session[] = [
    {
      id: "session-1",
      deviceName: "MacBook Pro",
      deviceType: "desktop",
      browser: "Chrome",
      os: "macOS",
      ipAddress: "192.168.1.100",
      location: "San Francisco, CA",
      lastActive: new Date("2024-01-15T10:00:00Z"),
      isCurrent: true,
    },
    {
      id: "session-2",
      deviceName: "iPhone 15",
      deviceType: "mobile",
      browser: "Safari",
      os: "iOS",
      ipAddress: "192.168.1.101",
      location: "San Francisco, CA",
      lastActive: new Date("2024-01-15T08:00:00Z"),
      isCurrent: false,
    },
    {
      id: "session-3",
      deviceName: "Windows PC",
      deviceType: "desktop",
      browser: "Edge",
      os: "Windows",
      ipAddress: "203.0.113.45",
      location: "New York, NY",
      lastActive: new Date("2024-01-14T10:00:00Z"),
      isCurrent: false,
    },
  ];

  // Example social accounts data
  const exampleSocialAccounts: SocialAccount[] = [
    {
      provider: "google",
      email: "user@gmail.com",
      name: "Google Account",
      isConnected: true,
      isVerified: true,
      isPrimary: true,
      connectedAt: new Date("2023-01-15"),
    },
    {
      provider: "github",
      email: "user@github.com",
      name: "GitHub Account",
      isConnected: true,
      isVerified: true,
      isPrimary: false,
      connectedAt: new Date("2023-02-20"),
    },
    {
      provider: "apple",
      isConnected: false,
    },
    {
      provider: "microsoft",
      isConnected: false,
    },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-8">
        <AuthLoginForm
          onSocialLogin={(provider) => {
            console.log("Social login:", provider);
          }}
          onSubmit={(data) => {
            console.log("Login submitted:", data);
          }}
        />
        <AuthSignupForm
          onSocialLogin={(provider) => {
            console.log("Social signup:", provider);
          }}
          onSubmit={(data) => {
            console.log("Signup submitted:", data);
          }}
          privacyUrl="https://example.com/privacy"
          termsUrl="https://example.com/terms"
        />
        <AuthForgotPassword
          defaultEmail="user@example.com"
          isSuccess={forgotPasswordSuccess}
          onBack={() => setForgotPasswordSuccess(false)}
          onSubmit={(email) => {
            console.log("Password reset requested for:", email);
            setTimeout(() => setForgotPasswordSuccess(true), 1000);
          }}
        />
        <AuthVerifyEmail
          email="user@example.com"
          onResend={() => {
            console.log("Resending verification email");
            setVerifyEmailStatus("pending");
          }}
          resendCooldown={60}
          status={verifyEmailStatus}
        />
        <AuthResetPassword
          isTokenValid={true}
          onSubmit={(data) => {
            console.log("Password reset:", data);
          }}
          token="reset-token-123"
        />
      </div>
      <div className="flex flex-col gap-8">
        <AuthChangePassword
          isSuccess={changePasswordSuccess}
          onSubmit={(data) => {
            console.log("Password changed:", data);
            setTimeout(() => setChangePasswordSuccess(true), 1000);
          }}
        />
        <AuthMagicLink
          email="user@example.com"
          onResend={(email) => {
            console.log("Resending magic link to:", email);
            setMagicLinkStatus("sent");
          }}
          onSubmit={(email) => {
            console.log("Magic link requested for:", email);
            setTimeout(() => setMagicLinkStatus("sent"), 1000);
          }}
          resendCooldown={60}
          status={magicLinkStatus}
        />
        <AuthOTPVerify
          deliveryAddress="user@example.com"
          deliveryMethod="email"
          onResend={(method) => {
            console.log("Resending OTP via:", method);
          }}
          onSubmit={(code) => {
            console.log("OTP verified:", code);
          }}
          resendCooldown={60}
        />
        <AuthTwoFactorVerify
          onRecoveryCode={(code) => {
            console.log("Recovery code used:", code);
          }}
          onResend={() => {
            console.log("Resending 2FA code");
          }}
          onSubmit={(code) => {
            console.log("2FA code verified:", code);
          }}
          resendCooldown={60}
        />
        <AuthPhoneVerify
          countryCode="US"
          onChangePhone={() => {
            setPhoneVerifyStatus("pending");
          }}
          onOTPSubmit={(code) => {
            console.log("Phone OTP verified:", code);
            setTimeout(() => setPhoneVerifyStatus("verified"), 1000);
          }}
          onPhoneSubmit={(phone, countryCode) => {
            console.log("Phone submitted:", phone, countryCode);
            setTimeout(() => setPhoneVerifyStatus("sent"), 1000);
          }}
          onResend={() => {
            console.log("Resending phone code");
          }}
          phoneNumber="(555) 123-4567"
          resendCooldown={60}
          status={phoneVerifyStatus}
        />
        <AuthSocialAccounts
          accounts={exampleSocialAccounts}
          onConnect={(provider) => {
            console.log("Connecting:", provider);
          }}
          onDisconnect={(provider) => {
            console.log("Disconnecting:", provider);
          }}
          onSetPrimary={(provider) => {
            console.log("Setting primary:", provider);
          }}
        />
      </div>
      <div className="flex flex-col gap-8">
        <AuthTwoFactorSetup
          backupCodes={["ABC123", "DEF456", "GHI789", "JKL012", "MNO345"]}
          isEnabled={twoFactorEnabled}
          onDisable={(password) => {
            console.log("2FA disabled with password");
            setTwoFactorEnabled(false);
          }}
          onEnable={() => {
            console.log("2FA enabled");
            setTwoFactorEnabled(true);
          }}
          onGenerateBackupCodes={() => {
            console.log("Generating backup codes");
          }}
          onRegenerateSecret={() => {
            console.log("Regenerating secret");
          }}
          qrCodeUrl="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Example:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example"
          secretKey="JBSWY3DPEHPK3PXP"
        />
        <AuthEmailChange
          currentEmail="user@example.com"
          isSuccess={false}
          onSubmit={(data) => {
            console.log("Email change requested:", data);
          }}
        />
        <AuthRecoveryCodes
          codes={["ABC123", "DEF456", "GHI789", "JKL012", "MNO345", "PQR678"]}
          onGenerate={() => {
            console.log("Generating recovery codes");
          }}
          onRegenerate={() => {
            console.log("Regenerating recovery codes");
          }}
        />
        <AuthSessionManager
          onRevoke={(sessionId) => {
            console.log("Revoking session:", sessionId);
          }}
          onRevokeAll={() => {
            console.log("Revoking all sessions");
          }}
          sessions={exampleSessions}
        />
        <AuthAccountDelete
          dataSummary={{
            projects: 12,
            files: 245,
            storage: "2.5 GB",
          }}
          onDelete={(data) => {
            console.log("Account deletion requested:", data);
          }}
        />
      </div>
    </div>
  );
}
