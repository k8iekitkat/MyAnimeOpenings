"use client";

import { useMemo, useState } from "react";

const animeThemes = [
  {
    title: "Skyline Pulse",
    anime: "Edge of Sun",
    season: "OP 1  2023",
    tone: "Electro-pop shimmer",
    rating: "9.4",
  },
  {
    title: "Moonlit Graffiti",
    anime: "Night Circuit",
    season: "OP 2  2021",
    tone: "Lo-fi city nights",
    rating: "8.8",
  },
  {
    title: "Aurora Spiral",
    anime: "Starbound Echo",
    season: "OP 1  2024",
    tone: "Dream-pop lift",
    rating: "9.1",
  },
];

const profiles = [
  {
    username: "midnightchorus",
    favorites: "38 rated openings",
    topTheme: "Skyline Pulse",
  },
  {
    username: "openingvault",
    favorites: "24 rated openings",
    topTheme: "Aurora Spiral",
  },
  {
    username: "citypoparc",
    favorites: "17 rated openings",
    topTheme: "Moonlit Graffiti",
  },
];

type SearchMode = "themes" | "profiles";

export default function Home() {
  const [mode, setMode] = useState<SearchMode>("themes");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const themeResults = useMemo(() => {
    if (!normalizedQuery) {
      return animeThemes;
    }

    return animeThemes.filter((theme) =>
      [theme.title, theme.anime, theme.season, theme.tone]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const profileResults = useMemo(() => {
    if (!normalizedQuery) {
      return profiles;
    }

    return profiles.filter((profile) =>
      [profile.username, profile.favorites, profile.topTheme]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const activeCount =
    mode === "themes" ? themeResults.length : profileResults.length;

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
              onClick={() => setMode("themes")}
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
              onClick={() => setMode("profiles")}
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

        <div className="mt-8">
          <label htmlFor="home-search" className="sr-only">
            Search
          </label>
          <input
            id="home-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              mode === "themes" ? "Search anime themes" : "Search profiles"
            }
            className="w-full rounded-full border border-[#17130f]/10 bg-white/85 px-5 py-4 text-base font-semibold text-[#17130f] shadow-sm backdrop-blur transition placeholder:text-[#8b6c4c]/70 focus:border-[#17130f]/30 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b6c4c]">
            {activeCount} Results
          </p>
        </div>

        {mode === "themes" ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {themeResults.map((theme) => (
              <article
                key={`${theme.anime}-${theme.title}`}
                className="rounded-[1.5rem] border border-[#17130f]/10 bg-[#f7f2eb]/80 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#17130f]">
                      {theme.title}
                    </h2>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6c4c]">
                      {theme.anime}
                    </p>
                  </div>
                  <div className="rounded-full bg-[#17130f] px-3 py-2 text-sm font-semibold text-[#f7f2eb]">
                    {theme.rating}
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#4f4031]">
                  <span className="rounded-full border border-[#17130f]/10 bg-white/70 px-3 py-2">
                    {theme.season}
                  </span>
                  <span className="rounded-full border border-[#17130f]/10 bg-white/70 px-3 py-2">
                    {theme.tone}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {profileResults.map((profile) => (
              <article
                key={profile.username}
                className="rounded-[1.5rem] border border-[#17130f]/10 bg-[#17130f] p-5 text-[#f7f2eb]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f2eb] text-[#17130f]">
                  <span className="font-display text-3xl">
                    {profile.username.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <h2 className="mt-5 text-2xl font-semibold">
                  {profile.username}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#d9b38d]">
                  {profile.favorites}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#f7f2eb]/70">
                  Top opening: {profile.topTheme}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
