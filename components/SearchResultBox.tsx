import Link from "next/link";

type SearchResultBoxProps = {
  title: string;
  href: string;
};

export function SearchResultBox({ title, href }: SearchResultBoxProps) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-[#17130f]/10 bg-white/80 p-5 text-[#17130f] shadow-sm transition hover:-translate-y-0.5 hover:border-[#17130f]/30 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#17130f]/30"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
    </Link>
  );
}
