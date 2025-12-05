"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {mode === "signin" ? "Sign in" : "Create account"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {mode === "signin" ? <SignInForm /> : <SignUpForm />}
        </CardContent>

        <CardFooter className="flex justify-center gap-2">
          <p className="text-sm text-muted-foreground">
            {mode === "signin"
              ? "Don’t have an account?"
              : "Already have an account?"}
          </p>
          <Button
            variant="link"
            size="sm"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin" ? "Sign up" : "Sign in"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function useFormState(initial = { email: "", password: "" }) {
  const [values, setValues] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof typeof values>(k: K, v: string) {
    setValues((s) => ({ ...s, [k]: v }));
  }

  return { values, setField, error, setError, loading, setLoading };
}

function validateEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function SignInForm() {
  const { values, setField, error, setError, loading, setLoading } =
    useFormState();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validateEmail(values.email))
      return setError("Please enter a valid email.");
    if (values.password.length < 6)
      return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Sign in failed");

      // assume backend returns { ok: true }
      router.push(json?.redirect || "/");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="name@example.com"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => setField("password", e.target.value)}
          placeholder="••••••••"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="pt-2">
        <Button type="submit" className={cn("w-full")} disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
}

function SignUpForm() {
  const { values, setField, error, setError, loading, setLoading } =
    useFormState();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validateEmail(values.email))
      return setError("Please enter a valid email.");
    if (values.password.length < 6)
      return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Sign up failed");

      router.push(json?.redirect || "/");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="name@example.com"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => setField("password", e.target.value)}
          placeholder="At least 6 characters"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="pt-2">
        <Button type="submit" className={cn("w-full")} disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </div>
    </form>
  );
}
