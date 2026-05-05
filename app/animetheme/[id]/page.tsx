import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { RatingForm } from "@/components/RatingForm";

type AnimeThemePageProps = {
  params: Promise<{
    id: string;
  }>;
};

type AnimeThemeResponse = {
  animeTheme?: AnimeTheme;
  animetheme?: AnimeTheme;
};

type AnimeTheme = {
  id?: number | string;
  title?: string;
  anime?: {
    name?: string;
    synopsis?: string | null;
  };
  song?: {
    title?: string;
  };
  animethemeentries?: AnimeThemeEntry[];
  animeThemeEntries?: AnimeThemeEntry[];
};

type AnimeThemeEntry = {
  videos?: AnimeThemeVideo[];
};

type AnimeThemeVideo = {
  link?: string;
};

type CachedAnimeTheme = {
  response_json: AnimeThemeResponse;
};

export default async function AnimeThemePage({ params }: AnimeThemePageProps) {
  const { id } = await params;
  const animeTheme = await getAnimeTheme(id);

  if (!animeTheme) {
    notFound();
  }

  const animeTitle = animeTheme.anime?.name ?? "Unknown anime";
  const songTitle = animeTheme.song?.title ?? animeTheme.title ?? "Untitled song";
  const synopsis = animeTheme.anime?.synopsis?.trim();
  const firstEntry =
    animeTheme.animethemeentries?.[0] ?? animeTheme.animeThemeEntries?.[0];
  const videoLink = firstEntry?.videos?.[0]?.link;

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-16">
      <section className="overflow-hidden rounded-[2rem] border border-[#17130f]/10 bg-white/65 shadow-[0_24px_80px_rgba(23,19,15,0.08)] backdrop-blur">
        <div className="border-b border-[#17130f]/10 px-6 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6c4c]">
                Anime Theme
              </p>
              <h1 className="mt-3 font-display text-6xl leading-none text-[#17130f] sm:text-7xl">
                {animeTitle}
              </h1>
              <p className="mt-3 text-xl font-semibold text-[#4f4031]">
                {songTitle}
              </p>
            </div>

            <RatingForm animethemeId={id} />
          </div>
        </div>

        <div className="grid items-start gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:px-10">
          <div className="overflow-hidden rounded-2xl border border-[#17130f]/10 bg-[#17130f] shadow-[0_18px_50px_rgba(23,19,15,0.16)]">
            {videoLink ? (
              <video
                className="aspect-video w-full bg-black"
                controls
                playsInline
                preload="metadata"
                src={videoLink}
              />
            ) : (
              <div className="flex aspect-video items-center justify-center px-6 text-center text-sm font-semibold text-[#f7f2eb]">
                No video is available for this anime theme.
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b6c4c]">
                Anime
              </p>
              <p className="mt-2 text-lg font-semibold text-[#17130f]">
                {animeTitle}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b6c4c]">
                Song
              </p>
              <p className="mt-2 text-lg font-semibold text-[#17130f]">
                {songTitle}
              </p>
            </div>

            <div className="border-t border-[#17130f]/10 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8b6c4c]">
                Synopsis
              </p>
              <p className="mt-3 text-sm leading-7 text-[#4f4031]">
                {synopsis ?? "No synopsis is available for this anime."}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

async function getAnimeTheme(id: string) {
  const cachedAnimeTheme = await getCachedAnimeTheme(id);

  if (cachedAnimeTheme) {
    return cachedAnimeTheme;
  }

  const animeThemeResponse = await fetchAnimeTheme(id);

  if (!animeThemeResponse) {
    return null;
  }

  const animeTheme =
    animeThemeResponse?.animeTheme ?? animeThemeResponse?.animetheme ?? null;

  if (animeTheme) {
    await cacheAnimeTheme(id, animeThemeResponse);
  }

  return animeTheme;
}

async function getCachedAnimeTheme(id: string) {
  const { data, error } = await supabase
    .from("animethemes")
    .select("response_json")
    .eq("id", id)
    .maybeSingle<CachedAnimeTheme>();

  if (error) {
    console.warn("Failed to read anime theme cache", error);
    return null;
  }

  return data?.response_json.animeTheme ?? data?.response_json.animetheme ?? null;
}

async function cacheAnimeTheme(id: string, responseJson: AnimeThemeResponse) {
  const { error } = await supabase.from("animethemes").upsert(
    {
      id: Number(id),
      response_json: responseJson,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.warn("Failed to write anime theme cache", error);
  }
}

async function fetchAnimeTheme(id: string) {
  const url = new URL(`https://api.animethemes.moe/animetheme/${id}`);
  url.searchParams.set("include", "anime,song,animethemeentries.videos");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
      "User-Agent": "MAOP",
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`AnimeThemes API error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as AnimeThemeResponse;
}
