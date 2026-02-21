"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { label: "Email", value: "contact@mhdshibili.com", href: "mailto:contact@mhdshibili.com" },
  { label: "Phone", value: "+91 859 297 3911", href: "tel:+918592973911" },
];

const socials = [
  { name: "Instagram", href: "#" },
  { name: "Behance", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Twitter", href: "#" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll(".contact-item"),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-40 px-8 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div ref={headingRef} className="mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Let&apos;s talk about
            <br />
            <span className="gradient-text">your project.</span>
          </h2>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-12">
            {contactInfo.map((info) => (
              <div key={info.label} className="contact-item">
                <span className="text-xs text-white/30 tracking-[0.15em] uppercase block mb-3">{info.label}</span>
                <a href={info.href} className="text-2xl sm:text-3xl font-semibold text-white hover:gradient-text transition-all">
                  {info.value}
                </a>
              </div>
            ))}
            <div className="contact-item pt-4">
              <span className="text-xs text-white/30 tracking-[0.15em] uppercase block mb-4">Follow</span>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a key={social.name} href={social.href} className="px-5 py-2.5 rounded-full text-sm text-white/50 border border-white/10 hover:text-white hover:border-white/25 transition-all duration-300">
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-item">
              <label className="text-xs text-white/30 tracking-[0.15em] uppercase block mb-3">Your Name</label>
              <input type="text" className="w-full bg-transparent border-b border-white/10 pb-4 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/15" placeholder="John Doe" />
            </div>
            <div className="contact-item">
              <label className="text-xs text-white/30 tracking-[0.15em] uppercase block mb-3">Your Email</label>
              <input type="email" className="w-full bg-transparent border-b border-white/10 pb-4 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/15" placeholder="john@example.com" />
            </div>
            <div className="contact-item">
              <label className="text-xs text-white/30 tracking-[0.15em] uppercase block mb-3">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-white/10 pb-4 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors resize-none placeholder:text-white/15" placeholder="Tell me about your project..." />
            </div>
            <button type="submit" className="mt-4 px-8 py-4 rounded-full font-medium text-white text-sm" style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
