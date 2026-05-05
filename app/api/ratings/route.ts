import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

type RatingBody = {
  animethemeId?: string | number;
  rating?: number;
};

type SessionRow = {
  username: string;
};

export async function POST(request: Request) {
  let body: RatingBody;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const animethemeId = Number(body.animethemeId);
  const rating = Number(body.rating);

  if (!Number.isInteger(animethemeId) || animethemeId <= 0) {
    return Response.json(
      { error: "Anime theme id must be a positive integer" },
      { status: 400 },
    );
  }

  if (!Number.isFinite(rating) || rating < 0 || rating > 10) {
    return Response.json(
      { error: "Rating must be a number from 0 to 10" },
      { status: 400 },
    );
  }

  const username = await getUsernameFromSession();

  if (!username) {
    return Response.json(
      { error: "You must be logged in to rate anime themes" },
      { status: 401 },
    );
  }

  const { error } = await supabase.from("ratings").upsert(
    {
      username,
      animetheme_id: animethemeId,
      rating,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "username,animetheme_id" },
  );

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}

async function getUsernameFromSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return null;
  }

  const { data, error } = await supabase
    .from("sessions")
    .select("username")
    .eq("cookie_id", sessionToken)
    .maybeSingle<SessionRow>();

  if (error) {
    return null;
  }

  return data?.username ?? null;
}
