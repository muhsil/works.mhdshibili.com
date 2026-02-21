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

      if (expRef.current) {
        gsap.fromTo(
          expRef.current.querySelectorAll(".exp-item"),
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: expRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (skillsRef.current) {
        const bars = skillsRef.current.querySelectorAll(".skill-bar-fill");
        gsap.fromTo(
          bars,
          { width: "0%" },
          {
            width: (i: number) => `${skills[i].level}%`,
            stagger: 0.08,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll(".stat-item"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
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

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-20">
          <span className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8">
            Hi, I am{" "}
            <span className="gradient-text">Mohammed Shibili</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-white/50 text-lg leading-relaxed">
              A product designer with a knack for turning problems and
              opportunities into user-driven strategic solutions.
            </p>
            <p className="text-white/40 text-base leading-relaxed">
              As a product designer, I specialize in creating unique visual
              identities for digital products. I believe that a stunning
              design starts with common values, open communication, and
              respect for your audience.
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
                  className="exp-item flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-white/5 group hover:border-white/10 transition-colors"
                >
                  <div>
                    <p className="text-white font-medium">{exp.role}</p>
                    <p className="text-white/40 text-sm mt-1">{exp.company}</p>
                  </div>
                  <span className="text-white/30 text-sm font-mono mt-2 sm:mt-0">
                    {exp.period}
                  </span>
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
                    <span className="text-xs text-white/30 font-mono">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      style={{ width: "0%" }}
                    />
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
              className="stat-item p-8 rounded-2xl glass text-center"
            >
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
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
