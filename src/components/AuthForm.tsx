"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import SocialProviders from "./SocialProviders";
import { useRouter } from "next/navigation";

type Props = {
  mode: "sign-in" | "sign-up";
  onSubmit: (formData: FormData) => Promise<{ ok: boolean; userId?: string } | void>;
};

const inputClass =
  "w-full rounded-xl border border-light-300 bg-light-100 px-4 py-3 text-body text-dark-900 placeholder:text-dark-500 transition-colors focus:outline-none focus:ring-2 focus:ring-dark-900/10 focus:border-dark-500";

export default function AuthForm({ mode, onSubmit }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isSignUp = mode === "sign-up";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await onSubmit(formData);
      if (result?.ok) router.push("/");
    } catch (err) {
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="text-center">
        <p className="text-caption text-dark-700">
          {isSignUp ? "Already have an account? " : "Don\u2019t have an account? "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-medium underline underline-offset-2 hover:text-dark-900"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </p>
        <h1 className="mt-3 text-heading-3 text-dark-900">
          {isSignUp ? "Join Nike Today!" : "Welcome Back!"}
        </h1>
        <p className="mt-1 text-body text-dark-700">
          {isSignUp
            ? "Create your account to start your fitness journey"
            : "Sign in to continue your journey"}
        </p>
      </header>

      {/* Social providers */}
      <SocialProviders variant={mode} />

      {/* Divider */}
      <div className="flex items-center gap-4" role="separator">
        <hr className="h-px flex-1 border-0 bg-light-300" />
        <span className="shrink-0 text-caption text-dark-700">
          Or {isSignUp ? "sign up" : "sign in"} with
        </span>
        <hr className="h-px flex-1 border-0 bg-light-300" />
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name (sign-up only) */}
        {isSignUp && (
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-caption text-dark-900">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              className={inputClass}
              autoComplete="name"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-caption text-dark-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            className={inputClass}
            autoComplete="email"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="text-caption text-dark-900">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="minimum 8 characters"
              className={`${inputClass} pr-12`}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={8}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-dark-500 transition-colors hover:text-dark-900"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-dark-900 px-6 py-3 text-body-medium text-light-100 transition-colors hover:bg-dark-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-900/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Please wait\u2026" : isSignUp ? "Sign Up" : "Sign In"}
        </button>

        {/* Terms (sign-up only) */}
        {isSignUp && (
          <p className="text-center text-footnote text-dark-700">
            By signing up, you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:text-dark-900">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 hover:text-dark-900">
              Privacy Policy
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
