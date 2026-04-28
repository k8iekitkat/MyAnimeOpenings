import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from '@/lib/supabase';
import { cookies } from "next/headers";


async function getUserFromSession() {
  const cookieStore = await cookies();
  const session_token = cookieStore.get('session')?.value;
  if (!session_token) {
    redirect("/signup");
  }
  const {data, error} = await supabase.from('sessions').select('username').eq('cookie_id', session_token);
  if (error) {
    redirect("/signup");
  }
  // const username = data[0].username;
  // const { data, error } = await supabase.from('users').select('*').eq('username', username);
  return data[0];
}

export default async function ProfilePage() {
  const user = await getUserFromSession();
  if(!user) {
    console.log(user);
    redirect('/login');
  }
  const userProfile = {
    username: user.username,
  };

  const highestRatedTheme = {
    title: "Temp",
    anime: "Temp Anime",
    rating: 9.9,
  };


  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-12">
      <section className="rounded-[2rem] border border-[#17130f]/10 bg-white/50 p-6 shadow-[0_24px_80px_rgba(23,19,15,0.08)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-[#17130f] text-[#f7f2eb] shadow-[0_18px_50px_rgba(23,19,15,0.22)] sm:h-32 sm:w-32">
              <span className="font-display text-6xl">Temp</span>
            </div>

            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6c4c]">
                User Profile
              </p>
              <h1 className="mt-3 font-display text-5xl leading-none text-[#17130f] sm:text-7xl">
                {userProfile.username}
              </h1>
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
            <p className="mt-3 font-display text-5xl text-[#f7f2eb]">0</p>
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
