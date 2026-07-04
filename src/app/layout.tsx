import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Ghost Studio | Produção & Criação",
  description: "Estúdio de produção e criação. Transformamos ideias em experiências.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-[#F5F2ED] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
