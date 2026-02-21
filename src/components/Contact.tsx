"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { label: "Phone", value: "+91 859 297 3911" },
  { label: "Email", value: "contact@mhdshibili.com" },
  { label: "Location", value: "Borough 47, Devon, UK" },
];

const socials = [
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Behance", href: "#" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll(".contact-item"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
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
    <section ref={sectionRef} id="contact" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-20">
          <span className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            It&apos;s time to talk
            <br />
            about <span className="gradient-text">your project.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mt-6 leading-relaxed">
            Let&apos;s embark on a creative journey together by shaping a
            visual narrative of your brand in the crowded digital space.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            {contactInfo.map((info) => (
              <div key={info.label} className="contact-item">
                <span className="text-xs text-white/30 tracking-widest uppercase block mb-2">
                  {info.label}
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-white">
                  {info.value}
                </p>
              </div>
            ))}

            <div className="contact-item pt-8">
              <span className="text-xs text-white/30 tracking-widest uppercase block mb-4">
                Follow
              </span>
              <div className="flex flex-wrap gap-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="px-5 py-2.5 rounded-full text-sm text-white/50 glass hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-item">
              <label className="text-xs text-white/30 tracking-widest uppercase block mb-3">
                Your Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/15"
                placeholder="John Doe"
              />
            </div>
            <div className="contact-item">
              <label className="text-xs text-white/30 tracking-widest uppercase block mb-3">
                Your Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/15"
                placeholder="john@example.com"
              />
            </div>
            <div className="contact-item">
              <label className="text-xs text-white/30 tracking-widest uppercase block mb-3">
                Subject
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/15"
                placeholder="Project Inquiry"
              />
            </div>
            <div className="contact-item">
              <label className="text-xs text-white/30 tracking-widest uppercase block mb-3">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors resize-none placeholder:text-white/15"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-10 py-4 rounded-full font-medium text-white text-lg relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              }}
            >
              <span className="relative z-10">Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
