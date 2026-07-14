import type { Metadata } from "next";
import Header from "@/components/Header";
import PortfolioShowcaseGrid from "@/components/PortfolioShowcaseGrid";
import { MosaicProvider } from "@/components/Mosaic/MosaicProvider";

export const metadata: Metadata = {
  title: "Ghost Studio | Work",
  description: "Selected work and projects by Ghost Studio.",
};

export default function WorkPage() {
  return (
    <MosaicProvider>
      <Header />
      <main id="main-content">
        <PortfolioShowcaseGrid />
      </main>
    </MosaicProvider>
  );
}
