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
  const horizontalRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation with clip-path reveal
      gsap.fromTo(
        headingRef.current,
        { clipPath: "inset(0 0 100% 0)", y: 60 },
        {
          clipPath: "inset(0 0 0% 0)",
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Horizontal scroll pinning
      if (horizontalRef.current) {
        const cards = horizontalRef.current.querySelectorAll(".work-card");
        const totalWidth = (cards.length - 1) * (window.innerWidth > 768 ? 700 : 340);

        const scrollTween = gsap.to(horizontalRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=200 top",
            end: () => `+=${totalWidth + 500}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Progress bar
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=200 top",
            end: () => `+=${totalWidth + 500}`,
            scrub: 1,
          },
        });

        // Stagger each card's internal elements as they come into view
        cards.forEach((card) => {
          const title = card.querySelector(".work-title");
          const tags = card.querySelectorAll(".work-tag");
          const arrow = card.querySelector(".work-arrow");
          const bigLetter = card.querySelector(".work-big-letter");

          gsap.fromTo(
            title,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "left 80%",
                toggleActions: "play none none none",
                containerAnimation: scrollTween,
              },
            }
          );

          gsap.fromTo(
            tags,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "left 80%",
                toggleActions: "play none none none",
                containerAnimation: scrollTween,
              },
              delay: 0.2,
            }
          );

          gsap.fromTo(
            arrow,
            { scale: 0, rotation: -90 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "left 80%",
                toggleActions: "play none none none",
                containerAnimation: scrollTween,
              },
              delay: 0.3,
            }
          );

          gsap.fromTo(
            bigLetter,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 0.05,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "left 80%",
                toggleActions: "play none none none",
                containerAnimation: scrollTween,
              },
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
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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

        {/* Progress bar */}
        <div className="mb-8 h-px bg-white/10 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full w-full origin-left"
            style={{ background: "linear-gradient(90deg, #7c3aed, #06b6d4)", transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div ref={horizontalRef} className="flex gap-8 pl-6 md:pl-[calc((100vw-80rem)/2+1.5rem)]">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="work-card group relative rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 w-[320px] md:w-[660px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className={`relative w-full aspect-[4/3] md:aspect-[16/10] bg-gradient-to-br ${project.color} p-6 md:p-10 flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="work-tag px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="work-title text-2xl sm:text-3xl md:text-5xl font-bold text-white">
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
                <div className="work-arrow w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
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

              <div className="work-big-letter absolute inset-0 flex items-center justify-center opacity-0">
                <span className="text-[20vw] font-black text-white select-none">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
