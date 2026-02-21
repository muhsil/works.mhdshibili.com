"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement[]>([]);
  const line2Ref = useRef<HTMLSpanElement[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Split text character animation for "MOHAMMED"
    tl.fromTo(
      line1Ref.current,
      { y: 120, opacity: 0, rotateX: -90, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out",
      }
    );

    // Split text for "SHIBILI"
    tl.fromTo(
      line2Ref.current,
      { y: 120, opacity: 0, rotateX: -90, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.7"
    );

    tl.fromTo(
      taglineRef.current,
      { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" },
      { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power3.out" },
      "-=0.5"
    );

    tl.fromTo(
      descRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      ctaRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    );

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.2"
    );

    // Floating orbs
    gsap.to(orb1Ref.current, {
      x: 50, y: -30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(orb2Ref.current, {
      x: -40, y: 40, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
    gsap.to(orb3Ref.current, {
      x: 30, y: 50, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    // Scroll indicator bounce
    gsap.to(scrollRef.current, {
      y: 10, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    // Parallax on scroll - hero content moves up faster
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector(".hero-content"), {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Orbs parallax at different speeds
      gsap.to(orb1Ref.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      gsap.to(orb2Ref.current, {
        yPercent: -80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const btn = magneticBtnRef.current;
    if (!btn) return;

    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    };

    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const line1 = "MOHAMMED";
  const line2 = "SHIBILI";

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #f43f5e 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="hero-content relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div ref={taglineRef} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/60 glass">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for freelance work
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8">
          <span className="block text-white overflow-hidden" style={{ perspective: "600px" }}>
            {line1.split("").map((char, i) => (
              <span
                key={`l1-${i}`}
                ref={(el) => { if (el) line1Ref.current[i] = el; }}
                className="inline-block"
                style={{ transformOrigin: "bottom center" }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="block gradient-text overflow-hidden" style={{ perspective: "600px" }}>
            {line2.split("").map((char, i) => (
              <span
                key={`l2-${i}`}
                ref={(el) => { if (el) line2Ref.current[i] = el; }}
                className="inline-block"
                style={{
                  transformOrigin: "bottom center",
                  background: "linear-gradient(135deg, #06b6d4 0%, #7c3aed 50%, #f43f5e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {char}
              </span>
            ))}
          </span>
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
            ref={magneticBtnRef}
            href="#works"
            className="magnetic-btn group px-8 py-4 rounded-full font-medium text-white relative overflow-hidden inline-block"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Portfolio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
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
          <div className="w-1 h-2 rounded-full bg-white/40 animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}
