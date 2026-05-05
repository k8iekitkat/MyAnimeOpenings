import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

type SearchKind = "themes" | "profiles";

type SearchResult = {
  title: string;
  href: string;
};

type AnimeThemesResponse = {
  animeThemes?: AnimeTheme[];
  animethemes?: AnimeTheme[];
};

type AnimeTheme = {
  id?: number | string;
  title?: string;
  type?: string;
  sequence?: number | string | null;
  slug?: string;
  anime?: {
    name?: string;
  };
  song?: {
    title?: string;
  };
};

type ProfileRow = {
  username: string;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const kind = searchParams.get("kind");
  const query = searchParams.get("q")?.trim() ?? "";

  if (kind !== "themes" && kind !== "profiles") {
    return Response.json(
      { error: "Search kind must be 'themes' or 'profiles'" },
      { status: 400 },
    );
  }

  const results = await searchByKind(kind, query);

  return Response.json({ results });
}

async function searchByKind(
  kind: SearchKind,
  query: string,
): Promise<SearchResult[]> {
  if (kind === "themes") {
    return searchAnimeThemes(query);
  }

  return searchProfiles(query);
}

async function searchProfiles(query: string): Promise<SearchResult[]> {
  if (!query) {
    return [];
  }

  const { data, error } = await supabase
    .from("users")
    .select("username")
    .ilike("username", `%${query}%`)
    .order("username", { ascending: true })
    .limit(24);

  if (error) {
    throw new Error(`Profile search error: ${error.message}`);
  }

  return ((data ?? []) as ProfileRow[]).map((profile) => ({
    title: profile.username,
    href: `/profile/${encodeURIComponent(profile.username)}`,
  }));
}

async function searchAnimeThemes(query: string): Promise<SearchResult[]> {
  if (!query) {
    return [];
  }

  const url = new URL("https://api.animethemes.moe/animetheme");
  url.searchParams.set("q", query);
  url.searchParams.set("include", "anime,song");

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "User-Agent": "MAOP",
    },
  });

  if (!response.ok) {
    throw new Error(`AnimeThemes API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as AnimeThemesResponse;
  const animeThemes = data.animeThemes ?? data.animethemes ?? [];

  return animeThemes.flatMap((animeTheme) => {
    if (animeTheme.id === undefined || animeTheme.id === null) {
      return [];
    }

    return [
      {
        title: formatAnimeThemeTitle(animeTheme),
        href: `/animetheme/${animeTheme.id}`,
      },
    ];
  });
}

function formatAnimeThemeTitle(animeTheme: AnimeTheme) {
  const themeTitle =
    animeTheme.song?.title ??
    animeTheme.title ??
    formatThemeType(animeTheme) ??
    animeTheme.slug ??
    "Untitled theme";
  const animeName = animeTheme.anime?.name ?? "Unknown anime";

  return `${themeTitle} - ${animeName}`;
}

function formatThemeType(animeTheme: AnimeTheme) {
  if (!animeTheme.type) {
    return null;
  }

  return animeTheme.sequence
    ? `${animeTheme.type} ${animeTheme.sequence}`
    : animeTheme.type;
}
