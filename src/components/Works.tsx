"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Grams & Liters",
    category: "Branding",
    desc: "Where freshness meets customization",
    image: "/images/project-gl.webp",
    tags: ["Branding", "Visual Identity", "Packaging"],
  },
  {
    title: "Beyond Living",
    category: "Product",
    desc: "Architecture Studio",
    image: "/images/project-beyond.webp",
    tags: ["UI/UX", "Web Design", "Branding"],
  },
  {
    title: "Xendou",
    category: "UX/UI",
    desc: "Marketing site design and build",
    image: "/images/project-xendou.jpg",
    tags: ["Web Design", "Development", "Strategy"],
  },
  {
    title: "Blvck",
    category: "Branding",
    desc: "Marketing site design and build",
    image: "/images/project-blvck.jpg",
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
        { y: 60, opacity: 0 },
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
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="works" className="relative py-32 px-6">
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

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="work-card group relative rounded-2xl overflow-hidden cursor-pointer project-card"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute top-4 right-4">
                  <span className="text-sm font-mono text-white/40">
                    0{index + 1}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-sm">{project.desc}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0 ml-4">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
