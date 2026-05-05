import Link from "next/link";
import { getOptionalUserFromSession } from "@/lib/auth";

export async function SiteNav() {
  const user = await getOptionalUserFromSession();
  const accountHref = user ? `/profile/${user.username}` : "/login";

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-5">
      <Link href="/" className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17130f] text-[#f7f2eb] shadow-lg">
          <span className="font-display text-2xl">OP</span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#8b6c4c]">
            Anime Opening Theme
          </p>
          <span className="block font-display text-4xl tracking-wide text-[#17130f] sm:text-5xl">
            My Anime Openings
          </span>
        </div>
      </Link>

      <nav className="flex flex-1 flex-wrap items-center justify-end gap-3">
        <Link
          href="/"
          className="rounded-full border border-[#17130f]/12 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#17130f] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#17130f]/30"
        >
          Home
        </Link>
        <Link
          href={accountHref}
          className="rounded-full border border-[#17130f] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#17130f] transition hover:-translate-y-0.5 hover:bg-[#17130f] hover:text-[#f7f2eb]"
        >
          Account
        </Link>
      </nav>
    </header>
  );
}
