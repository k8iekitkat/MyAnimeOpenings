import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

type UserRow = {
  username: string;
};

type RatingRow = {
  animetheme_id: number;
  rating: number;
  updated_at: string | null;
};

type CachedAnimeThemeRow = {
  id: number;
  response_json: AnimeThemeResponse;
};

type AnimeThemeResponse = {
  animeTheme?: AnimeTheme;
  animetheme?: AnimeTheme;
};

type AnimeTheme = {
  title?: string;
  anime?: {
    name?: string;
  };
  song?: {
    title?: string;
  };
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const username = decodeURIComponent(id);
  const user = await getProfile(username);

  if (!user) {
    notFound();
  }

  const ratings = await getRatings(user.username);
  const animeThemes = await getCachedAnimeThemes(
    ratings.map((rating) => rating.animetheme_id),
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 sm:py-12">
      <section className="overflow-hidden rounded-[2rem] border border-[#17130f]/10 bg-white/55 shadow-[0_24px_80px_rgba(23,19,15,0.08)] backdrop-blur">
        <div className="border-b border-[#17130f]/10 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-[2rem] bg-[#17130f] text-[#f7f2eb] shadow-[0_18px_50px_rgba(23,19,15,0.22)] sm:h-32 sm:w-32">
              <span className="font-display text-6xl">
                {user.username.slice(0, 2).toUpperCase()}
              </span>
            </div>

            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6c4c]">
                Profile
              </p>
              <h1 className="mt-3 font-display text-5xl leading-none text-[#17130f] sm:text-7xl">
                {user.username}
              </h1>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6c4c]">
                {ratings.length} rated anime themes
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8b6c4c]">
                Ratings
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#17130f]">
                Highest to lowest
              </h2>
            </div>
          </div>

          {ratings.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-[#17130f]/10 bg-[#f7f2eb]/80 p-5 text-sm font-semibold text-[#4f4031]">
              This profile has not rated any anime themes yet.
            </p>
          ) : (
            <div className="mt-6 grid gap-4">
              {ratings.map((rating) => {
                const cachedTheme = animeThemes.get(rating.animetheme_id);
                const animeTheme =
                  cachedTheme?.response_json.animeTheme ??
                  cachedTheme?.response_json.animetheme;

                return (
                  <Link
                    key={`${user.username}-${rating.animetheme_id}`}
                    href={`/animetheme/${rating.animetheme_id}`}
                    className="rounded-[1.25rem] border border-[#17130f]/10 bg-[#f7f2eb]/80 p-5 transition hover:-translate-y-0.5 hover:border-[#17130f]/25 hover:bg-white/80"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-[#17130f]">
                          {formatThemeTitle(
                            rating.animetheme_id,
                            animeTheme,
                          )}
                        </h3>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6c4c]">
                          {animeTheme?.anime?.name ?? "Unknown anime"}
                        </p>
                      </div>
                      <div className="rounded-full bg-[#17130f] px-4 py-2 text-sm font-semibold text-[#f7f2eb]">
                        {formatRating(rating.rating)}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

async function getProfile(username: string) {
  const { data, error } = await supabase
    .from("users")
    .select("username")
    .eq("username", username)
    .maybeSingle<UserRow>();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function getRatings(username: string) {
  const { data, error } = await supabase
    .from("ratings")
    .select("animetheme_id,rating,updated_at")
    .eq("username", username)
    .order("rating", { ascending: false })
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as RatingRow[];
}

async function getCachedAnimeThemes(ids: number[]) {
  if (ids.length === 0) {
    return new Map<number, CachedAnimeThemeRow>();
  }

  const { data, error } = await supabase
    .from("animethemes")
    .select("id,response_json")
    .in("id", ids);

  if (error) {
    throw new Error(error.message);
  }

  return new Map(
    ((data ?? []) as CachedAnimeThemeRow[]).map((animeTheme) => [
      animeTheme.id,
      animeTheme,
    ]),
  );
}

function formatThemeTitle(id: number, animeTheme?: AnimeTheme) {
  return animeTheme?.song?.title ?? animeTheme?.title ?? `Anime theme ${id}`;
}

function formatRating(rating: number) {
  return Number.isInteger(rating) ? rating.toString() : rating.toFixed(1);
}
