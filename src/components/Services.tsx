"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { num: "01", title: "Brand Identity", desc: "Logos, color palettes and style guides for a memorable brand." },
  { num: "02", title: "UI & UX Design", desc: "Intuitive interfaces for web and mobile that users love." },
  { num: "03", title: "3D Art & Illustration", desc: "Custom 3D models and illustrations that elevate storytelling." },
  { num: "04", title: "Motion Graphics", desc: "Dynamic animations from micro-interactions to hero-reel showpieces." },
  { num: "05", title: "Creative Direction", desc: "Cohesive visual visions aligning brand goals and audience impact." },
  { num: "06", title: "Workshops", desc: "Hands-on sessions on design process and creative optimization." },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.querySelectorAll(".service-row"),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: listRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-40 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headingRef} className="mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white/50 mb-6">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
            What I can do for your brand.
          </h2>
        </div>

        <div ref={listRef}>
          {services.map((service) => (
            <div
              key={service.num}
              className="service-row group flex flex-col md:flex-row md:items-center gap-4 md:gap-12 py-8 border-b border-white/5 hover:border-white/15 transition-colors cursor-default"
            >
              <span className="text-xs font-mono text-white/20 md:w-12 flex-shrink-0">{service.num}</span>
              <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:gradient-text transition-all md:w-72 flex-shrink-0">
                {service.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed flex-1">
                {service.desc}
              </p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/10 group-hover:text-white/40 transition-colors flex-shrink-0 hidden md:block">
                <path d="M4.5 19.5l15-15M19.5 4.5H8.25M19.5 4.5v11.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
