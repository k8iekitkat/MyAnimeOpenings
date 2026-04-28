import { redirect } from "next/navigation";
// import { getUserFromSession } from "@/lib/auth";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const user = await getUserFromSession();

//   if (!user) {
//     redirect("/login");
//   }

  return <>{children}</>;
}