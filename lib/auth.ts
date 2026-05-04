import { redirect } from "next/navigation";
import { supabase } from '@/lib/supabase';
import { cookies } from "next/headers";

export async function getUserFromSession() {
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