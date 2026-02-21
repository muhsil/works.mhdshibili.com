"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      nameRef.current,
      { y: 120, opacity: 0, skewY: 5 },
      { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: "power4.out" }
    )
      .fromTo(
        taglineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );

    gsap.to(orb1Ref.current, {
      x: 50,
      y: -30,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(orb2Ref.current, {
      x: -40,
      y: 40,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(orb3Ref.current, {
      x: 30,
      y: 50,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(scrollRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #f43f5e 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div ref={taglineRef} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/60 glass">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for freelance work
          </span>
        </div>

        <h1
          ref={nameRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8"
        >
          <span className="block text-white">MOHAMMED</span>
          <span className="block gradient-text">SHIBILI</span>
        </h1>

        <p
          ref={descRef}
          className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          A Creative Director & Brand Visualizer helping brands tell their
          stories through design, 3D art, illustration, and motion.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#works"
            className="group px-8 py-4 rounded-full font-medium text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
          >
            <span className="relative z-10">View Portfolio</span>
          </a>
          <a
            href="mailto:contact@mhdshibili.com"
            className="px-8 py-4 rounded-full font-medium text-white/70 hover:text-white gradient-border transition-colors duration-300"
          >
            contact@mhdshibili.com
          </a>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </div>
      </div>
    </section>
  );
}
