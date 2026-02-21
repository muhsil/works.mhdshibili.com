"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated top border line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );

      // Content fade up
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
            delay: 0.3,
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0 }, duration: 1.5, ease: "power3.inOut" });
  };

  return (
    <footer ref={footerRef} className="py-12 px-6 relative">
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full h-px origin-left"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)" }}
      />
      <div ref={contentRef} className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} Mohammed Shibili. All rights reserved.
        </div>
        <div className="flex items-center gap-8">
          {["Instagram", "Twitter", "LinkedIn", "Behance"].map((name) => (
            <a key={name} href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors duration-300 hover:translate-y-[-2px] inline-block">
              {name}
            </a>
          ))}
        </div>
        <button
          ref={backToTopRef}
          onClick={scrollToTop}
          className="group w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/5 transition-colors duration-300"
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 group-hover:text-white transition-colors transform group-hover:-translate-y-0.5 transition-transform duration-300">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
