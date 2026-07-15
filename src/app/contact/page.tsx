import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { MosaicProvider } from "@/components/Mosaic/MosaicProvider";

export const metadata: Metadata = {
  title: "Ghost Studio | Contact",
  description: "Get in touch with Ghost Studio.",
};

export default function ContactPage() {
  return (
    <MosaicProvider>
      <Header />
      <main id="main-content">
        <ContactForm />
      </main>
      <Footer />
    </MosaicProvider>
  );
}
