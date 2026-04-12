"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";

const openingNotes = [
  "Build a profile to keep track of the openings you replay most.",
  "Save favorites, rank eras, and keep your own watchlist in one place.",
  "Your password stays local to signup handling and is hashed server-side.",
];

export default function SignUpPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    setError("");
    setSuccess("");

    if (!username) {
      setError("Choose a username before continuing.");
      return;
    }

    if (password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/sign_up", {
          method: "POST",
          body: formData,
        });

        const data = (await response.json().catch(() => null)) as
          | { error?: string; message?: string }
          | null;

        if (!response.ok) {
          setError(data?.error ?? "Signup failed. Please try again.");
          return;
        }

        setSuccess(data?.message ?? "Account created.");
        form.reset();
      } catch {
        setError("Unable to reach the signup service right now.");
      }
    });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12">
      <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-center rounded-[2rem] border border-[#17130f]/10 bg-white/45 p-8 shadow-[0_24px_80px_rgba(23,19,15,0.08)] backdrop-blur md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6c4c]">
            Join The Playlist
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none text-[#17130f] sm:text-7xl">
            Sign Up
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#4f4031] sm:text-lg">
            Create your account to collect standout openings, revisit your
            favorite arcs, and keep your own curated theme-library.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {openingNotes.map((note) => (
              <div
                key={note}
                className="rounded-[1.5rem] border border-[#17130f]/10 bg-[#f7f2eb]/80 p-4"
              >
                <p className="text-sm leading-6 text-[#4f4031]">{note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#6b5642]">
            <span className="rounded-full border border-[#17130f]/10 bg-white/70 px-4 py-2 font-semibold uppercase tracking-[0.18em]">
              Secure signup
            </span>
            <span className="rounded-full border border-[#17130f]/10 bg-white/70 px-4 py-2 font-semibold uppercase tracking-[0.18em]">
              Favorite tracking
            </span>
            <span className="rounded-full border border-[#17130f]/10 bg-white/70 px-4 py-2 font-semibold uppercase tracking-[0.18em]">
              Personal lists
            </span>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#17130f]/10 bg-[#17130f] p-6 text-[#f7f2eb] shadow-[0_24px_80px_rgba(23,19,15,0.16)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#d9b38d]">
                Account Access
              </p>
              <h2 className="mt-3 font-display text-4xl text-[#f7f2eb]">
                Start Building Your List
              </h2>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f2eb] text-[#17130f] shadow-lg">
              <span className="font-display text-3xl">OP</span>
            </div>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.18em] text-[#d9b38d]">
                Username
              </span>
              <input
                type="text"
                name="username"
                placeholder="ex. midnightchorus"
                autoComplete="username"
                required
                className="w-full rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-base text-[#f7f2eb] placeholder:text-[#f7f2eb]/45 focus:border-[#ffd8a8] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.18em] text-[#d9b38d]">
                Password
              </span>
              <input
                type="password"
                name="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-base text-[#f7f2eb] placeholder:text-[#f7f2eb]/45 focus:border-[#ffd8a8] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.18em] text-[#d9b38d]">
                Confirm Password
              </span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-base text-[#f7f2eb] placeholder:text-[#f7f2eb]/45 focus:border-[#ffd8a8] focus:outline-none"
              />
            </label>

            {(error || success) && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${
                  error
                    ? "border-[#ff9c88]/35 bg-[#ff9c88]/10 text-[#ffd0c6]"
                    : "border-[#b9f3e4]/30 bg-[#b9f3e4]/10 text-[#dffbf4]"
                }`}
              >
                {error || success}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-[#f7f2eb] px-5 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#17130f] transition hover:-translate-y-0.5 hover:bg-[#ffd8a8] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#f7f2eb]/70">
            <p>Already have an account? Login</p>
            <Link
              href="/"
              className="rounded-full border border-white/14 px-4 py-2 font-semibold uppercase tracking-[0.18em] text-[#f7f2eb] transition hover:bg-white/8"
            >
              Back Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
