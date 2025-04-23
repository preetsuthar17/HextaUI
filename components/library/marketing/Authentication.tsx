"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import { Github, Twitter, Mail, Shield, KeyRound } from "lucide-react";

// SIMPLE SIGN UP FORM

const signUpSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and privacy policy.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof signUpSchema>;

export function SimpleSignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function onSubmit(values: FormData) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log(values);
      // Here you would typically send the data to your backend
    }, 2000);
  }

  return (
    <Card className="w-[400px] bg-secondary/50">
      <CardHeader className="space-y-1">
        <CardTitle className="font-medium">Welcome 👋</CardTitle>
        <CardDescription className="text-2xl ">
          Let's get started!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a strong password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Retype your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create new account"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// SIMPLE SIGN IN FORM

const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SimpleSignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignInFormData) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log(values);
      // Here you would typically send the data to your backend
    }, 2000);
  }

  return (
    <Card className="w-[400px] bg-secondary/50">
      <CardHeader className="space-y-1">
        <CardTitle className="font-medium">Welcome Back 👋</CardTitle>
        <CardDescription className="text-2xl ">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// ALL IN ONE COMPONENT

export function AllInOneAuthentication() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authMethod, setAuthMethod] = useState<string>("email");

  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FormData) {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log(values);
      // Here you would typically send the data to your backend
    }, 2000);
  }

  function handleSocialLogin(provider: string) {
    console.log(`Logging in with ${provider}`);
    // Here you would typically initiate the OAuth flow for the selected provider
  }

  function handleMagicLink() {
    const email = form.getValues("email");
    if (email) {
      console.log(`Sending magic link to ${email}`);
      // Here you would typically send a magic link to the provided email
    } else {
      form.setError("email", {
        type: "manual",
        message: "Email is required for magic link",
      });
    }
  }

  return (
    <Card className="w-[400px] bg-secondary/50">
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
        <CardDescription>
          Choose your preferred method to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" onValueChange={setAuthMethod}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="magic">Magic Link</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="social">
            <div className="space-y-4 pt-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("github")}
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("twitter")}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Continue with Twitter
              </Button>
              <Separator />
              <p className="text-center text-sm text-muted-foreground">
                More options coming soon...
              </p>
            </div>
          </TabsContent>
          <TabsContent value="magic">
            <Form {...form}>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleMagicLink}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Magic Link
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Two-Factor Authentication Form
const twoFactorSchema = z.object({
  verificationMethod: z.enum(["sms", "authenticator", "email"]),
  phoneNumber: z.string().optional(),
  code: z.string().min(6, "Verification code must be 6 digits").max(6),
});

type TwoFactorFormData = z.infer<typeof twoFactorSchema>;

export function TwoFactorAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const form = useForm<TwoFactorFormData>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      verificationMethod: "authenticator",
      code: "",
    },
  });

  function onSubmit(values: TwoFactorFormData) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(values);
    }, 1500);
  }

  return (
    <Card className="w-[400px] bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Two-Factor Authentication
        </CardTitle>
        <CardDescription>Verify your identity to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="verificationMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select verification method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="authenticator">
                        Authenticator App
                      </SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("verificationMethod") === "sms" && (
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="000000" maxLength={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Enterprise SSO Login Form
const ssoSchema = z.object({
  organization: z.string().min(1, "Organization is required"),
  domain: z.string().min(1, "Domain is required"),
  rememberDevice: z.boolean(), // Remove .default(false)
});

type SSOFormData = z.infer<typeof ssoSchema>;

export function EnterpriseSSO() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SSOFormData>({
    resolver: zodResolver(ssoSchema),
    defaultValues: {
      organization: "",
      domain: "",
      rememberDevice: false, // Always provide a boolean
    },
  });

  function onSubmit(values: SSOFormData) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(values);
    }, 1500);
  }

  return (
    <Card className="w-[400px] bg-secondary/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5" />
          Enterprise Login
        </CardTitle>
        <CardDescription>
          Sign in with your organization credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Domain</FormLabel>
                  <FormControl>
                    <Input placeholder="acme.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberDevice"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remember this device</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Authenticating..." : "Continue with SSO"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Contact your IT administrator if you're having trouble logging in.
        </p>
      </CardFooter>
    </Card>
  );
}
