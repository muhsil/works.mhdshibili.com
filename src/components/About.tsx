"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experience = [
  { role: "Freelancing", company: "@Olyve", period: "2017 \u2013 Present" },
  { role: "Creative Director", company: "@Blurb Studios", period: "Mar 2024 \u2013 Present" },
  { role: "Co-Founder/Visual Designer", company: "@iWedding", period: "Apr 2022 \u2013 Dec 2023" },
  { role: "Graphic Designer", company: "@CP Group", period: "Dec 2020 \u2013 Mar 2022" },
];

const skills = [
  { name: "Photoshop", level: 98 },
  { name: "Illustrator", level: 93 },
  { name: "After Effects", level: 70 },
  { name: "InDesign", level: 90 },
  { name: "Figma", level: 98 },
  { name: "Blender 3D", level: 80 },
  { name: "Substance Painter", level: 97 },
  { name: "DaVinci", level: 90 },
  { name: "Lightroom", level: 98 },
  { name: "Adobe XD", level: 90 },
];

const stats = [
  { value: "7+", label: "Years of Experience" },
  { value: "100+", label: "Projects Completed" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const nameCharsRef = useRef<HTMLSpanElement[]>([]);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label slide
      const label = headingRef.current?.querySelector(".section-label");
      if (label) {
        gsap.fromTo(
          label,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: label,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Name character-by-character reveal
      if (nameCharsRef.current.length > 0) {
        gsap.fromTo(
          nameCharsRef.current,
          { y: 60, opacity: 0, rotateX: -45 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.02,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Bio paragraphs slide up with clip-path
      if (bioRef.current) {
        const paras = bioRef.current.querySelectorAll("p");
        gsap.fromTo(
          paras,
          { y: 40, opacity: 0, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Experience items with line animation
      if (expRef.current) {
        const items = expRef.current.querySelectorAll(".exp-item");
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              delay: i * 0.08,
            }
          );

          const border = item.querySelector(".exp-border");
          if (border) {
            gsap.fromTo(
              border,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
                delay: i * 0.08 + 0.3,
              }
            );
          }
        });
      }

      // Skills bars with counter
      if (skillsRef.current) {
        const bars = skillsRef.current.querySelectorAll(".skill-bar-fill");
        const counters = skillsRef.current.querySelectorAll(".skill-counter");
        gsap.fromTo(
          bars,
          { width: "0%" },
          {
            width: (i: number) => `${skills[i].level}%`,
            stagger: 0.08,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        counters.forEach((counter, i) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: skills[i].level,
            duration: 1.5,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              (counter as HTMLElement).textContent = `${Math.round(obj.val)}%`;
            },
          });
        });
      }

      // Stats with bounce
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll(".stat-item"),
          { y: 60, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameText = "Mohammed Shibili";

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-20">
          <span className="section-label text-sm text-white/40 tracking-widest uppercase mb-4 block">
            About Me
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 overflow-hidden"
            style={{ perspective: "600px" }}
          >
            Hi, I am{" "}
            {nameText.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) nameCharsRef.current[i] = el;
                }}
                className="inline-block"
                style={{
                  transformOrigin: "bottom center",
                  background:
                    char === " "
                      ? "transparent"
                      : "linear-gradient(135deg, #06b6d4 0%, #7c3aed 50%, #f43f5e 100%)",
                  WebkitBackgroundClip: char === " " ? undefined : "text",
                  WebkitTextFillColor: char === " " ? undefined : "transparent",
                  backgroundClip: char === " " ? undefined : "text",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <div ref={bioRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-white/50 text-lg leading-relaxed">
              A product designer with a knack for turning problems and
              opportunities into user-driven strategic solutions.
            </p>
            <p className="text-white/40 text-base leading-relaxed">
              As a product designer, I specialize in creating unique visual
              identities for digital products. I believe that a stunning design
              starts with common values, open communication, and respect for
              your audience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div ref={expRef}>
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-cyan-500" />
              Experience
            </h3>
            <div className="space-y-0">
              {experience.map((exp) => (
                <div
                  key={exp.role}
                  className="exp-item flex flex-col sm:flex-row sm:items-center justify-between py-6 group relative"
                >
                  <div>
                    <p className="text-white font-medium group-hover:text-white transition-colors">
                      {exp.role}
                    </p>
                    <p className="text-white/40 text-sm mt-1">{exp.company}</p>
                  </div>
                  <span className="text-white/30 text-sm font-mono mt-2 sm:mt-0">
                    {exp.period}
                  </span>
                  <div className="exp-border absolute bottom-0 left-0 w-full h-px bg-white/5 origin-left group-hover:bg-white/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div ref={skillsRef}>
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gradient-to-r from-violet-500 to-cyan-500" />
              Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">{skill.name}</span>
                    <span className="skill-counter text-xs text-white/30 font-mono">
                      0%
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" style={{ width: "0%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 gap-6 max-w-lg">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item p-8 rounded-2xl glass text-center group hover:bg-white/5 transition-colors duration-500"
            >
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2 group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
