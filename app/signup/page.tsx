"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

const openingNotes = [
  "Build a profile to keep track of the openings you replay most.",
  "Save favorites, rank eras, and keep your own watchlist in one place.",
  "Make your profile searchable as your list grows.",
];

export default function SignUpPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    setError("");
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

        router.push("/login");
      } catch {
        setError("Unable to reach the signup service right now.");
      }
    });
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl items-start px-6 pb-8 pt-2 lg:min-h-[calc(100vh-6.5rem)] lg:items-center">
      <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-center rounded-[2rem] border border-[#17130f]/10 bg-white/45 p-6 shadow-[0_24px_80px_rgba(23,19,15,0.08)] backdrop-blur md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6c4c]">
            Join The Playlist
          </p>
          <h1 className="mt-4 font-display text-6xl leading-none text-[#17130f] sm:text-7xl">
            Sign Up
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#4f4031]">
            Create your account to collect standout openings, revisit your
            favorite arcs, and keep your own curated theme-library.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {openingNotes.map((note) => (
              <div
                key={note}
                className="rounded-[1.5rem] border border-[#17130f]/10 bg-[#f7f2eb]/80 p-4"
              >
                <p className="text-sm leading-6 text-[#4f4031]">{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#17130f]/10 bg-[#17130f] p-5 text-[#f7f2eb] shadow-[0_24px_80px_rgba(23,19,15,0.16)] sm:p-6">
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

          <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
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
                className="w-full rounded-2xl border border-white/12 bg-white/8 px-5 py-3 text-base text-[#f7f2eb] placeholder:text-[#f7f2eb]/45 focus:border-[#ffd8a8] focus:outline-none"
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
                className="w-full rounded-2xl border border-white/12 bg-white/8 px-5 py-3 text-base text-[#f7f2eb] placeholder:text-[#f7f2eb]/45 focus:border-[#ffd8a8] focus:outline-none"
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
                className="w-full rounded-2xl border border-white/12 bg-white/8 px-5 py-3 text-base text-[#f7f2eb] placeholder:text-[#f7f2eb]/45 focus:border-[#ffd8a8] focus:outline-none"
              />
            </label>

            {error && (
              <div
                className="rounded-2xl border border-[#ff9c88]/35 bg-[#ff9c88]/10 px-4 py-3 text-sm leading-6 text-[#ffd0c6]"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-[#f7f2eb] px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#17130f] transition hover:-translate-y-0.5 hover:bg-[#ffd8a8] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#f7f2eb]/70">
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#ffd8a8] transition hover:text-[#f7f2eb]"
              >
                Log in here
              </Link>
              .
            </p>
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
