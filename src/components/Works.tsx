"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Grams & Liters",
    category: "Branding",
    desc: "Where freshness meets customization",
    color: "from-violet-600 to-indigo-800",
    tags: ["Branding", "Visual Identity", "Packaging"],
  },
  {
    title: "Beyond Living",
    category: "Product",
    desc: "Architecture Studio",
    color: "from-cyan-600 to-teal-800",
    tags: ["UI/UX", "Web Design", "Branding"],
  },
  {
    title: "Xendou",
    category: "UX/UI",
    desc: "Marketing site design and build",
    color: "from-rose-600 to-pink-800",
    tags: ["Web Design", "Development", "Strategy"],
  },
  {
    title: "Blvck",
    category: "Branding",
    desc: "Marketing site design and build",
    color: "from-purple-600 to-violet-900",
    tags: ["Branding", "Digital", "Marketing"],
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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

      if (projectsRef.current) {
        const cards = projectsRef.current.querySelectorAll(".work-card");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 100, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              delay: i * 0.05,
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
              Selected Works
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Projects I&apos;m
              <br />
              <span className="gradient-text">proud of.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-md text-sm leading-relaxed">
            A curated collection of projects spanning branding, UI/UX design,
            3D art, and creative direction.
          </p>
        </div>

        <div ref={projectsRef} className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="work-card group relative rounded-3xl overflow-hidden cursor-pointer project-card"
            >
              <div
                className={`relative w-full aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br ${project.color} p-8 md:p-12 flex flex-col justify-between`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-sm font-mono text-white/40">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <p className="text-white/60 text-sm md:text-base">
                    {project.desc}
                  </p>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <span className="text-[20vw] font-black text-white select-none">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
