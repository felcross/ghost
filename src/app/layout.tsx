import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nProvider";

const SmoothScrollProvider = dynamic(
  () => import("@/components/SmoothScrollProvider")
);

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
    <html lang="pt-BR" className={`${inter.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-light-bg text-text-on-light">
        <SmoothScrollProvider>
          <I18nProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-text-on-light focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Pular para o conteúdo
            </a>
            {children}
          </I18nProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
