"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in on scroll
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Scroll-speed-based parallax: row1 moves left, row2 moves right
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          x: -200,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      if (row2Ref.current) {
        gsap.to(row2Ref.current, {
          x: 200,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text1 = "Let\u2019s work together \u2022 ";
  const text2 = "Creative Direction \u2022 Brand Design \u2022 UI/UX \u2022 3D Art \u2022 ";
  const repeated1 = text1.repeat(10);
  const repeated2 = text2.repeat(8);

  return (
    <div
      ref={containerRef}
      className="py-12 sm:py-16 overflow-hidden border-y border-white/5 space-y-4"
    >
      {/* Row 1 - moves left on scroll */}
      <div ref={row1Ref} className="marquee whitespace-nowrap">
        <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white/[0.03] tracking-tight">
          {repeated1}
        </span>
        <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white/[0.03] tracking-tight">
          {repeated1}
        </span>
      </div>
      {/* Row 2 - moves right on scroll, outlined text */}
      <div ref={row2Ref} className="marquee-reverse whitespace-nowrap">
        <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight marquee-outline">
          {repeated2}
        </span>
        <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight marquee-outline">
          {repeated2}
        </span>
      </div>
    </div>
  );
}
