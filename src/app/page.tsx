import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Works from "@/components/Works";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Works />
      <About />
      <Marquee />
      <Contact />
      <Footer />
    </>
  );
}
