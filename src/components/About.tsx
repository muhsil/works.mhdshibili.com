"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: textRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-40 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-4xl mb-16"
        >
          Hi! I&apos;m Mohammed Shibili, a Creative Director & Brand Visualizer
          helping brands tell their stories through design, 3D art, illustration, and motion.
        </h2>
        <div ref={textRef} className="flex flex-col md:flex-row md:justify-end gap-8 max-w-xl md:ml-auto">
          <p className="text-white/50 text-base leading-relaxed">
            I believe that exceptional design starts with common values, open
            communication, and respect for your audience. Let&apos;s create
            something meaningful together.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white border border-white/20 hover:bg-white/5 transition-colors whitespace-nowrap self-start"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
