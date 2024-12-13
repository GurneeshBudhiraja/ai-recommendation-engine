"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Auth } from "@/services/services";
import { useRef } from "react";

export function LoginForm() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>("");
  const auth = new Auth();
  const loginWithProvider = async (
    provider: "microsoft" | "google" | "email",
    credentials?: { email: string; password: string }
  ) => {
    try {
      setError("");
      if (provider === "microsoft") {
        const microsoftLoginResp = await auth.microsoftLogin();

        // TODO: remove after testing
        console.log("microsoftLoginResponse Is: ");
        console.log(microsoftLoginResp);
      } else if (provider === "google") {
        const googleLoginResp = await auth.googleLogin();
        // TODO: remove after testing
        console.log("googleLoginResponse Is: ");
        console.log(googleLoginResp);
      } else if (provider === "email") {
        if (
          !credentials ||
          !credentials.email.trim() ||
          !credentials.password.trim()
        ) {
          throw new Error("Email and password are required");
        }
        const emailResp = await auth.loginWithEmail(credentials);

        // TODO: remove after testing
        console.log("emailLoginResponse Is: ");
        console.log(emailResp);
        router.push("/demo");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setError(error.message);
      }
    }
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {error && (
            <div className="w-full bg-red-100 text-red-600 text-center rounded-md p-2 shadow-sm whitespace-break-spaces text-sm ">
              {error}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={"testing1@gmail.com"}
              placeholder="m@example.com"
              required
              ref={emailRef}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required ref={passwordRef} />
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              if (emailRef.current && passwordRef.current) {
                loginWithProvider("email", {
                  email: emailRef.current?.value?.trim(),
                  password: passwordRef.current?.value?.trim(),
                });
              }
            }}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full h-fit"
            onClick={() => loginWithProvider("microsoft")}
          >
            Login with Microsoft{" "}
            <Image
              src={"/microsoft_logo.svg"}
              alt="Microsoft Logo"
              width={15}
              height={15}
            />
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => loginWithProvider("google")}
          >
            Login with Google
            <Image
              src={"/google.png"}
              alt="Google Logo"
              width={15}
              height={15}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
