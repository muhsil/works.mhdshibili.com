"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        greetRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
      )
        .fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          imageRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
          "-=1"
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );

      gsap.to(scrollRef.current, {
        y: 8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="relative z-10">
          <div ref={greetRef} className="mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/60 text-sm">Available for freelance work</span>
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
          >
            <span className="text-white">A Creative Director &</span>
            <br />
            <span className="gradient-text">Brand Visualizer</span>
          </h1>

          <p
            ref={descRef}
            className="text-white/40 text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
          >
            I help brands tell their stories through graphic design, 3D art,
            illustration, and motion, because exceptional design begins with
            shared values, open collaboration, and respect for your audience.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <a
              href="#works"
              className="px-7 py-3.5 rounded-full font-medium text-white text-sm"
              style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
            >
              View Portfolio
            </a>
            <a
              href="mailto:contact@mhdshibili.com"
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              contact@mhdshibili.com
            </a>
          </div>
        </div>

        <div ref={imageRef} className="relative flex justify-center lg:justify-end">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-white/10">
            <Image
              src="/images/hero.jpg"
              alt="Mohammed Shibili"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute top-8 left-4 sm:left-0 px-4 py-2 rounded-lg glass text-xs text-white/80 font-medium">
            Brand Research
          </div>
          <div className="absolute bottom-12 right-0 sm:right-2 px-4 py-2 rounded-lg glass text-xs text-white/80 font-medium">
            Visual Presentation
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
