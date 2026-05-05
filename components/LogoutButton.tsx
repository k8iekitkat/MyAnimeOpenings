"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      const body: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? "Logout failed");
      }

      router.push("/");
      router.refresh();
    } catch (logoutError) {
      setError(
        logoutError instanceof Error ? logoutError.message : "Logout failed",
      );
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="rounded-full border border-[#17130f] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#17130f] transition hover:-translate-y-0.5 hover:bg-[#17130f] hover:text-[#f7f2eb] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoggingOut ? "Logging out" : "Logout"}
      </button>
      {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}
    </div>
  );
}
