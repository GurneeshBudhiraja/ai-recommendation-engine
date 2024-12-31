"use client";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginInfo } from "@/types/appwrite.types";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/app/context/contextProvider";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfo>();
  // eslint-disable-next-line
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function loginUser(data: LoginInfo) {
    console.log("Logging user...");
    setLoading(true);
    setError(null);
    try {
      const loginResponse: AxiosResponse = await axios.post(
        "/api/v1/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const { success, id } = loginResponse.data;
      if (!success) {
        setError(loginResponse.data.message);
      }

      // Updates the state in the context API
      setUser(id);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("Error in login page", error);
        setError(error.response?.data.message);
      }
    } finally {
      router.refresh();
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(loginUser)}>
            {" "}
            {/* Add onSubmit handler */}
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
