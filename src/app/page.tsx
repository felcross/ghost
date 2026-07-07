import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"));
const BrazilShowcase = dynamic(() => import("@/components/BrazilShowcase"));
const TrustedBy = dynamic(() => import("@/components/TrustedBy"));
const SelectedWork = dynamic(() => import("@/components/SelectedWork"));
const WhyWorkWithUs = dynamic(() => import("@/components/WhyWorkWithUs"));
const Services = dynamic(() => import("@/components/Services"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Blog = dynamic(() => import("@/components/Blog"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <VideoShowcase />
        <BrazilShowcase />
        <TrustedBy />
        <SelectedWork />
        <WhyWorkWithUs />
        <Services />
        <Testimonials />
        <FAQ />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
