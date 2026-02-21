"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Grams & Liters",
    desc: "Where freshness meets customization",
    image: "/images/project-gl.webp",
    tags: ["Branding", "Visual Identity", "Packaging"],
  },
  {
    title: "Beyond Living",
    desc: "Architecture Studio",
    image: "/images/project-beyond.webp",
    tags: ["UI/UX", "Web Design", "Branding"],
  },
  {
    title: "Xendou",
    desc: "Marketing site design and build",
    image: "/images/project-xendou.jpg",
    tags: ["Web Design", "Development", "Strategy"],
  },
  {
    title: "Blvck",
    desc: "Marketing site design and build",
    image: "/images/project-blvck.jpg",
    tags: ["Branding", "Digital", "Marketing"],
  },
];

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".work-card");
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="works" className="relative py-40 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headingRef} className="mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white/50 mb-6">
            Cases
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-2xl">
            Projects I&apos;m proud of &mdash; crafted with purpose and passion.
          </h2>
        </div>

        <div ref={cardsRef} className="space-y-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="work-card group cursor-pointer"
            >
              <div className="relative w-full rounded-2xl overflow-hidden">
                <div className="relative w-full aspect-[16/9] md:aspect-[2/1]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-white/40 text-sm">{project.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs border border-white/10 text-white/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
