import { NextRequest } from "next/server";

type SearchKind = "themes" | "profiles";

type SearchResult = {
  title: string;
  href: string;
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
  void query;

  if (kind === "themes") {
    // TODO: Fill in backend search for anime opening/theme results.
    const data = await searchAnimeThemes(query);
    console.log(data);
    return [];
  }

  // TODO: Fill in backend search for profile/user results.
  return [];
}

async function searchAnimeThemes(query: string) {
  const url = new URL("https://api.animethemes.moe/animetheme");
  url.searchParams.set("q", query);
  console.log(url);
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "User-Agent": "MyAnimeSearchApp/1.0", 
    },
  });


  if (!response.ok) {
    throw new Error(`AnimeThemes API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}