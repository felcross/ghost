import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

const VideoShowcase = dynamic(() => import("@/components/VideoShowcase"));
const BrazilShowcase = dynamic(() => import("@/components/BrazilShowcase"));
const TrustedBy = dynamic(() => import("@/components/TrustedBy"));
const PortfolioShowcaseGrid = dynamic(() => import("@/components/PortfolioShowcaseGrid"));
const WhyWorkWithUs = dynamic(() => import("@/components/WhyWorkWithUs"));
const Services = dynamic(() => import("@/components/Services"));
// const Testimonials = dynamic(() => import("@/components/Testimonials"));
// const FAQ = dynamic(() => import("@/components/FAQ"));
const Blog = dynamic(() => import("@/components/Blog"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <PortfolioShowcaseGrid />
        <VideoShowcase />
        <BrazilShowcase />
        <TrustedBy />
        <WhyWorkWithUs />
        <Services />
        {/* <Testimonials /> */}
        {/* <FAQ /> */}
        <Blog />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
