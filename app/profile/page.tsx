import Link from "next/link";

const userProfile = {
  username: "Sample Username",
  avatarLabel: "PFP",
  about: "About",
};

const highestRatedTheme = {
  title: "Highest Rated Theme",
  anime: "Anime Title",
  rating: "9.4",
};

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-12">
      <section className="rounded-[2rem] border border-[#17130f]/10 bg-white/50 p-6 shadow-[0_24px_80px_rgba(23,19,15,0.08)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-[#17130f] text-[#f7f2eb] shadow-[0_18px_50px_rgba(23,19,15,0.22)] sm:h-32 sm:w-32">
              <span className="font-display text-6xl">{userProfile.avatarLabel}</span>
            </div>

            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6c4c]">
                User Profile
              </p>
              <h1 className="mt-3 font-display text-5xl leading-none text-[#17130f] sm:text-7xl">
                {userProfile.username}
              </h1>
              <p className="mt-4 text-base leading-7 text-[#4f4031] sm:text-lg">
                {userProfile.about}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-[#17130f] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#17130f] transition hover:-translate-y-0.5 hover:bg-[#17130f] hover:text-[#f7f2eb]"
            >
              Back Home
            </Link>
            <Link
              href="/"
              className="rounded-full border border-[#17130f]/12 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#17130f] transition hover:-translate-y-0.5 hover:border-[#17130f]/30"
            >
              Logout
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.75rem] border border-[#17130f]/10 bg-[#f7f2eb]/80 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b6c4c]">
                  Highest Rated Opening
                </p>
                <p className="mt-3 font-display text-5xl text-[#17130f]">38</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-[#17130f] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#17130f] transition hover:bg-[#17130f] hover:text-[#f7f2eb]"
              >
                View All Ratings
              </button>
            </div>

            <article className="mt-5 rounded-[1.25rem] border border-[#17130f]/8 bg-white/75 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-[#17130f]">
                    {highestRatedTheme.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6c4c]">
                    {highestRatedTheme.anime}
                  </p>
                </div>
                <div className="rounded-full bg-[#17130f] px-4 py-2 text-sm font-semibold text-[#f7f2eb]">
                  {highestRatedTheme.rating}
                </div>
              </div>
            </article>
          </div>

          <div className="rounded-[1.75rem] border border-[#17130f]/10 bg-[#17130f] p-5 text-[#f7f2eb]">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d9b38d]">
              Friends
            </p>
            <p className="mt-3 font-display text-5xl text-[#f7f2eb]">12</p>
            <p className="mt-4 text-sm leading-6 text-[#f7f2eb]/70">
              Keep up with shared rankings, recent favorites, and who is
              chasing the next perfect opening.
            </p>

            <button
              type="button"
              className="mt-6 rounded-full border border-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f7f2eb] transition hover:bg-white/8"
            >
              View Friends
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
