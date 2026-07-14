import type { Metadata } from "next";
import Header from "@/components/Header";
import WhyWorkWithUs from "@/components/WhyWorkWithUs";
import Footer from "@/components/Footer";
import { MosaicProvider } from "@/components/Mosaic/MosaicProvider";

export const metadata: Metadata = {
  title: "Ghost Studio | About",
  description: "About Ghost Studio — why work with us.",
};

export default function AboutPage() {
  return (
    <MosaicProvider>
      <Header />
      <main id="main-content">
        <WhyWorkWithUs />
      </main>
      <Footer />
    </MosaicProvider>
  );
}
