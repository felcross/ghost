import type { Metadata } from "next";
import Header from "@/components/Header";
import Services from "@/components/Services";
import { MosaicProvider } from "@/components/Mosaic/MosaicProvider";

export const metadata: Metadata = {
  title: "Ghost Studio | Services",
  description: "Production and creative services by Ghost Studio.",
};

export default function ServicesPage() {
  return (
    <MosaicProvider>
      <Header />
      <main id="main-content">
        <Services />
      </main>
    </MosaicProvider>
  );
}
