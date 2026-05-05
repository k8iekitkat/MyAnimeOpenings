import { redirect } from "next/navigation";
import { supabase } from '@/lib/supabase';
import { cookies } from "next/headers";

type SessionUser = {
  username: string;
};

export async function getUserFromSession() {
  const user = await getOptionalUserFromSession();

  if (!user) {
    redirect("/signup");
  }

  return user;
}

export async function getOptionalUserFromSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session_token = cookieStore.get('session')?.value;

  if (!session_token) {
    return null;
  }

  const {data, error} = await supabase
    .from('sessions')
    .select('username')
    .eq('cookie_id', session_token)
    .maybeSingle<SessionUser>();

  if (error) {
    return null;
  }

  return data;
}
