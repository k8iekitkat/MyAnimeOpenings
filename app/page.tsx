"use client";

import { SearchResultBox } from "@/components/SearchResultBox";
import type { FormEvent } from "react";
import { useState } from "react";

const animeThemes = [
  {
    title: "Skyline Pulse",
    href: "/themes/skyline-pulse",
    anime: "Edge of Sun",
    season: "OP 1  2023",
    tone: "Electro-pop shimmer",
    rating: "9.4",
  },
  {
    title: "Moonlit Graffiti",
    href: "/themes/moonlit-graffiti",
    anime: "Night Circuit",
    season: "OP 2  2021",
    tone: "Lo-fi city nights",
    rating: "8.8",
  },
  {
    title: "Aurora Spiral",
    href: "/themes/aurora-spiral",
    anime: "Starbound Echo",
    season: "OP 1  2024",
    tone: "Dream-pop lift",
    rating: "9.1",
  },
];

const profiles = [
  {
    username: "midnightchorus",
    href: "/profile/midnightchorus",
    favorites: "38 rated openings",
    topTheme: "Skyline Pulse",
  },
  {
    username: "openingvault",
    href: "/profile/openingvault",
    favorites: "24 rated openings",
    topTheme: "Aurora Spiral",
  },
  {
    username: "citypoparc",
    href: "/profile/citypoparc",
    favorites: "17 rated openings",
    topTheme: "Moonlit Graffiti",
  },
];

type SearchMode = "themes" | "profiles";

type SearchResult = {
  title: string;
  href: string;
};

export default function Home() {
  const [mode, setMode] = useState<SearchMode>("themes");
  const [draftQuery, setDraftQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>(() =>
    animeThemes.map((theme) => ({
      title: theme.title,
      href: theme.href,
    })),
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  async function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSearching(true);
    setSearchError("");

    try {
      const searchParams = new URLSearchParams({
        kind: mode,
        q: draftQuery.trim(),
      });
      const response = await fetch(`/api/search?${searchParams.toString()}`);
      const body: { results?: SearchResult[]; error?: string } =
        await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? "Search failed");
      }

      setResults(body.results ?? []);
    } catch (error) {
      setSearchError(
        error instanceof Error ? error.message : "Search failed",
      );
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  function handleModeChange(nextMode: SearchMode) {
    setMode(nextMode);
    setSearchError("");
    setResults(
      nextMode === "themes"
        ? animeThemes.map((theme) => ({
            title: theme.title,
            href: theme.href,
          }))
        : profiles.map((profile) => ({
            title: profile.username,
            href: profile.href,
          })),
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-16">
      <section className="rounded-[2rem] border border-[#17130f]/10 bg-white/50 p-6 shadow-[0_24px_80px_rgba(23,19,15,0.08)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6c4c]">
              Search
            </p>
            <h1 className="mt-3 font-display text-6xl leading-none text-[#17130f] sm:text-7xl">
              Find Openings
            </h1>
          </div>

          <div className="flex rounded-full border border-[#17130f]/10 bg-[#f7f2eb]/80 p-1">
            <button
              type="button"
              onClick={() => handleModeChange("themes")}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                mode === "themes"
                  ? "bg-[#17130f] text-[#f7f2eb]"
                  : "text-[#17130f] hover:bg-white/80"
              }`}
            >
              Anime Themes
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("profiles")}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                mode === "profiles"
                  ? "bg-[#17130f] text-[#f7f2eb]"
                  : "text-[#17130f] hover:bg-white/80"
              }`}
            >
              Profiles
            </button>
          </div>
        </div>

        <form className="mt-8" onSubmit={handleSearchSubmit}>
          <label htmlFor="home-search" className="sr-only">
            Search
          </label>
          <input
            id="home-search"
            type="search"
            value={draftQuery}
            onChange={(event) => setDraftQuery(event.target.value)}
            placeholder={
              mode === "themes" ? "Search anime themes" : "Search profiles"
            }
            className="w-full rounded-full border border-[#17130f]/10 bg-white/85 px-5 py-4 text-base font-semibold text-[#17130f] shadow-sm backdrop-blur transition placeholder:text-[#8b6c4c]/70 focus:border-[#17130f]/30 focus:outline-none"
          />
        </form>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b6c4c]">
            {isSearching ? "Searching" : `${results.length} Results`}
          </p>
        </div>

        {searchError ? (
          <p className="mt-4 text-sm font-semibold text-red-700">
            {searchError}
          </p>
        ) : null}

        {!isSearching && results.length === 0 && !searchError ? (
          <p className="mt-4 text-sm font-semibold text-[#8b6c4c]">
            No results found.
          </p>
        ) : null}

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {results.map((result) => (
            <SearchResultBox
              key={`${result.href}-${result.title}`}
              href={result.href}
              title={result.title}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
