"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

const loginNotes = [
  "Pick up where you left off and jump back into your saved openings.",
  "Keep favorites, rankings, and future watchlist ideas tied to one profile.",
  "See your friends Profile pages and compare rankings!",
];

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setError("");

    if (!username) {
      setError("Enter your username to continue.");
      return;
    }

    if (!password) {
      setError("Enter your password to continue.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = (await response.json().catch(() => null)) as
          | { error?: string; message?: string }
          | null;

        if (!response.ok) {
          const apiError =
            typeof data?.error === "string"
              ? data.error
              : "Login failed. Please try again.";
          setError(apiError);
          return;
        }

        router.push("/profile");
      } catch {
        setError("Unable to reach the login service right now.");
      }
    });
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12">
      <div className="grid w-full gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <section className="rounded-[2rem] border border-[#17130f]/10 bg-[#17130f] p-6 text-[#f7f2eb] shadow-[0_24px_80px_rgba(23,19,15,0.16)] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#d9b38d]">
                Welcome Back
              </p>
              <h1 className="mt-3 font-display text-5xl leading-none text-[#f7f2eb] sm:text-6xl">
                Log In
              </h1>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f2eb] text-[#17130f] shadow-lg">
              <span className="font-display text-3xl">OP</span>
            </div>
          </div>

          <p className="mt-5 max-w-lg text-base leading-7 text-[#f7f2eb]/78 sm:text-lg">
            Access your profile and get back to the openings you have already
            collected, ranked, and queued up for later.
          </p>

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
                placeholder="Your password"
                autoComplete="current-password"
                required
                className="w-full rounded-2xl border border-white/12 bg-white/8 px-5 py-4 text-base text-[#f7f2eb] placeholder:text-[#f7f2eb]/45 focus:border-[#ffd8a8] focus:outline-none"
              />
            </label>

            {error && (
              <div className="rounded-2xl border border-[#ff9c88]/35 bg-[#ff9c88]/10 px-4 py-3 text-sm leading-6 text-[#ffd0c6]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-[#f7f2eb] px-5 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#17130f] transition hover:-translate-y-0.5 hover:bg-[#ffd8a8] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? "Checking..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#f7f2eb]/70">
            <p>
              Need an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#ffd8a8] transition hover:text-[#f7f2eb]"
              >
                Create one here
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

        <section className="flex flex-col justify-center rounded-[2rem] border border-[#17130f]/10 bg-white/45 p-8 shadow-[0_24px_80px_rgba(23,19,15,0.08)] backdrop-blur md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6c4c]">
            Return To Your Library
          </p>
          <h2 className="mt-4 font-display text-6xl leading-none text-[#17130f] sm:text-7xl">
            Press Play Again
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#4f4031] sm:text-lg">
            The same warm visual language as signup, but tuned for returning
            users who just want quick access back into their list.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {loginNotes.map((note) => (
              <div
                key={note}
                className="rounded-[1.5rem] border border-[#17130f]/10 bg-[#f7f2eb]/80 p-4"
              >
                <p className="text-sm leading-6 text-[#4f4031]">{note}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
