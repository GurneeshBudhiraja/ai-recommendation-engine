"use client";
import Link from "next/link";
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
import { OAuthLogin } from "@/services/services";

export function LoginForm() {
  const oauthLogin = new OAuthLogin();
  const loginWithProvider = async (provider: "microsoft" | "google") => {
    try {
      if (provider === "microsoft") {
        const microsoftLoginResp = await oauthLogin.microsoftLogin();

        // TODO: remove after testing
        console.log("microsoftLoginResponse Is: ");
        console.log(microsoftLoginResp);
      } else {
        const googleLoginResp = await oauthLogin.googleLogin();
        // TODO: remove after testing
        console.log("googleLoginResponse Is: ");
        console.log(googleLoginResp);
      }
    } catch (error) {
      console.error(error);
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
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
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
      <Button
        // TODO: remove after testing
        onClick={async () => {
          const account = await oauthLogin.getAccount();
          console.log("account Is: ");
          console.log(account);
        }}
      >
        Get account
      </Button>
    </Card>
  );
}
