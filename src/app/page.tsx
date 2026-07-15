import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { MosaicProvider } from "@/components/Mosaic/MosaicProvider";

export default function Home() {
  return (
    <MosaicProvider>
      <Header />
      <main id="main-content">
        <Hero />
      </main>
    </MosaicProvider>
  );
}
