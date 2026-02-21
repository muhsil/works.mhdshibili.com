"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Brand Identity & Visual Systems",
    desc: "Craft logos, color palettes and style guides that give your brand a memorable, lasting look.",
  },
  {
    num: "02",
    title: "UI & UX Design",
    desc: "Design intuitive, accessible interfaces for web and mobile.",
  },
  {
    num: "03",
    title: "3D Art & Illustration",
    desc: "Create custom 3D models and illustrations that elevate your storytelling.",
  },
  {
    num: "04",
    title: "Motion Graphics & Animation",
    desc: "Bring ideas to life with dynamic animations, from micro-interactions to hero-reel showpieces.",
  },
  {
    num: "05",
    title: "Creative Direction & Strategy",
    desc: "Lead cohesive visual visions\u2014aligning brand goals, design execution and audience impact.",
  },
  {
    num: "06",
    title: "Workshops & Consulting",
    desc: "Host hands-on sessions on biophilic design or creative process optimization.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".service-card");
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
            What I Do
          </span>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            Services that bring
            <br />
            <span className="gradient-text">your vision to life.</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.num}
              className="service-card group p-8 rounded-2xl glass hover:bg-white/5 transition-all duration-500 cursor-default"
            >
              <span className="text-sm font-mono gradient-text mb-6 block">
                {service.num}
              </span>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                {service.desc}
              </p>
              <div className="mt-6 w-0 group-hover:w-full h-px bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
