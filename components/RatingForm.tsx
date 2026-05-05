"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type RatingFormProps = {
  animethemeId: string;
  initialRating: number | null;
};

export function RatingForm({ animethemeId, initialRating }: RatingFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(
    initialRating === null ? "" : formatInitialRating(initialRating),
  );
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          animethemeId,
          rating: Number(rating),
        }),
      });
      const body: { error?: string } = await response.json();

      if (response.status === 401) {
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(body.error ?? "Failed to save rating");
      }

      setStatus("Rating saved.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to save rating",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="w-full max-w-xs rounded-2xl border border-[#17130f]/10 bg-[#f7f2eb]/75 p-4"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="theme-rating"
        className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b6c4c]"
      >
        Your Rating
      </label>
      <div className="mt-3 flex items-center gap-3">
        <input
          id="theme-rating"
          name="rating"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          placeholder="0.0"
          required
          className="w-28 rounded-full border border-[#17130f]/10 bg-white px-4 py-3 text-base font-semibold text-[#17130f] shadow-sm transition placeholder:text-[#8b6c4c]/70 focus:border-[#17130f]/30 focus:outline-none"
        />
        <span className="text-sm font-semibold text-[#4f4031]">/ 10</span>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full rounded-full bg-[#17130f] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#f7f2eb] transition hover:bg-[#2b241d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving" : "Save Rating"}
      </button>
      {status ? (
        <p className="mt-3 text-sm font-semibold text-green-700">{status}</p>
      ) : null}
      {error ? (
        <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>
      ) : null}
    </form>
  );
}

function formatInitialRating(rating: number) {
  return Number.isInteger(rating) ? rating.toString() : rating.toFixed(1);
}
