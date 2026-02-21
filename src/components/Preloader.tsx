"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameCharsRef = useRef<HTMLSpanElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Counter animation
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(counter.val));
      },
    });

    // Animate line width
    tl.fromTo(
      lineRef.current,
      { width: "0%" },
      { width: "100%", duration: 2, ease: "power2.inOut" },
      0
    );

    // Stagger name characters in
    tl.fromTo(
      nameCharsRef.current,
      { y: 80, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: "power3.out",
      },
      0.3
    );

    // Hold for a moment
    tl.to({}, { duration: 0.3 });

    // Exit animation - slide up
    tl.to(nameCharsRef.current, {
      y: -60,
      opacity: 0,
      stagger: 0.02,
      duration: 0.4,
      ease: "power3.in",
    });

    tl.to(counterRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power3.in",
    }, "-=0.3");

    tl.to(preloaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const name = "MOHAMMED SHIBILI";

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#0a0a0a" }}
    >
      <div className="relative overflow-hidden mb-8">
        <div className="flex" style={{ perspective: "600px" }}>
          {name.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                if (el) nameCharsRef.current[i] = el;
              }}
              className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter ${
                char === " " ? "mx-2 sm:mx-3" : ""
              }`}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4, #f43f5e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>

      <div className="w-48 sm:w-64 md:w-80 h-px bg-white/10 relative mb-6">
        <div
          ref={lineRef}
          className="absolute top-0 left-0 h-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)" }}
        />
      </div>

      <span
        ref={counterRef}
        className="text-sm font-mono text-white/40 tracking-widest"
      >
        {count}%
      </span>
    </div>
  );
}
