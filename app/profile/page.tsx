import { redirect } from "next/navigation";
import { getUserFromSession } from "@/lib/auth";

export default async function ProfileRedirectPage() {
  const user = await getUserFromSession();

  redirect(`/profile/${user.username}`);
}
