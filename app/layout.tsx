import type { Metadata } from "next";
import { Bebas_Neue, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "My Anime Openings",
  description: "Curate and revisit the most iconic anime opening themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${bebasNeue.variable} antialiased`}>
          <div className="relative min-h-screen overflow-hidden bg-[#f7f2eb] text-[#17130f]">
          <div className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-[#ffd8a8] blur-[120px]" />
          <div className="pointer-events-none absolute top-24 left-[-10%] h-[360px] w-[360px] rounded-full bg-[#b9f3e4] blur-[130px]" />
          <div className="pointer-events-none absolute bottom-[-20%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#ffc4b4] blur-[140px]" />

          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
