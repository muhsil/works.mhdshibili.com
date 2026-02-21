"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Works from "@/components/Works";
import About from "@/components/About";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      {loaded && <CustomCursor />}
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}>
        <Navbar />
        <Hero />
        <Services />
        <Works />
        <About />
        <Marquee />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
