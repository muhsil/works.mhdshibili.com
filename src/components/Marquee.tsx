"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const text = "Let\u2019s work together \u2022 ";
  const repeated = text.repeat(10);

  return (
    <div
      ref={containerRef}
      className="py-16 overflow-hidden border-y border-white/5"
    >
      <div className="marquee whitespace-nowrap">
        <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white/5 tracking-tight">
          {repeated}
        </span>
        <span className="text-5xl sm:text-6xl md:text-7xl font-black text-white/5 tracking-tight">
          {repeated}
        </span>
      </div>
    </div>
  );
}
