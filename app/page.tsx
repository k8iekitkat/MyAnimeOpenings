import Link from "next/link";

const recentOpenings = [
  {
    title: "Skyline Pulse",
    anime: "Edge of Sun",
    season: "OP 1  2023",
    tone: "Electro-pop shimmer",
  },
  {
    title: "Moonlit Graffiti",
    anime: "Night Circuit",
    season: "OP 2  2021",
    tone: "Lo-fi city nights",
  },
  {
    title: "Aurora Spiral",
    anime: "Starbound Echo",
    season: "OP 1  2024",
    tone: "Dream-pop lift",
  },
];

const spotlightTracks = [
  {
    label: "Chorus Hit",
    value: "00:42",
  },
  {
    label: "Tempo",
    value: "168 BPM",
  },
  {
    label: "Vibe",
    value: "Euphoric",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f2eb] text-[#17130f]">
      <div className="relative overflow-hidden">
        <header className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17130f] text-[#f7f2eb] shadow-lg">
              <span className="font-display text-2xl">OP</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8b6c4c]">
                Anime Opening Theme
              </p>
              <h1 className="font-display text-4xl tracking-wide text-[#17130f] sm:text-5xl">
                My Anime Openings
              </h1>
            </div>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-end gap-4">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search Opening"
                aria-label="Search Opening"
                className="w-full rounded-full border border-[#17130f]/10 bg-white/80 px-5 py-3 text-sm font-semibold text-[#17130f] shadow-sm backdrop-blur transition focus:border-[#17130f]/30 focus:outline-none"
              />
            </div>
            <Link
              href="/profile"
              className="rounded-full border border-[#17130f] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#17130f] transition hover:-translate-y-0.5 hover:bg-[#17130f] hover:text-[#f7f2eb]"
            >
              My Profile
            </Link>
          </div>
        </header>

        <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
          
        </main>
      </div>
    </div>
  );
}
