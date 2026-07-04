import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoShowcase from "@/components/VideoShowcase";
import BrazilShowcase from "@/components/BrazilShowcase";
import TrustedBy from "@/components/TrustedBy";
import SelectedWork from "@/components/SelectedWork";
import WhyWorkWithUs from "@/components/WhyWorkWithUs";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
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
