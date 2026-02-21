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
  const labelRef = useRef<HTMLSpanElement>(null);

  const descRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label slide in
      gsap.fromTo(
        labelRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Heading with clip-path reveal
      gsap.fromTo(
        headingRef.current,
        { clipPath: "inset(0 0 100% 0)", y: 50 },
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

      // Description fade in
      gsap.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Contact info items with stagger and line animation
      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll(".contact-item");
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { x: -40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                toggleActions: "play none none none",
              },
              delay: i * 0.08,
            }
          );
        });

        // Social buttons scale in
        const socialBtns = contentRef.current.querySelectorAll(".social-btn");
        gsap.fromTo(
          socialBtns,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: socialBtns[0] || contentRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Form fields slide up with stagger
      if (formRef.current) {
        const fields = formRef.current.querySelectorAll(".form-field");
        fields.forEach((field, i) => {
          gsap.fromTo(
            field,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: field,
                start: "top 95%",
                toggleActions: "play none none none",
              },
              delay: i * 0.1,
            }
          );

          // Animate the form field underline
          const underline = field.querySelector(".field-underline");
          if (underline) {
            gsap.fromTo(
              underline,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: field,
                  start: "top 95%",
                  toggleActions: "play none none none",
                },
                delay: i * 0.1 + 0.3,
              }
            );
          }
        });

        // Submit button bounce in
        gsap.fromTo(
          submitBtnRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: submitBtnRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    // Magnetic effect on submit button
    const btn = submitBtnRef.current;
    if (btn) {
      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
      };
      const handleLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };
      btn.addEventListener("mousemove", handleMove);
      btn.addEventListener("mouseleave", handleLeave);

      return () => {
        ctx.revert();
        btn.removeEventListener("mousemove", handleMove);
        btn.removeEventListener("mouseleave", handleLeave);
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span ref={labelRef} className="text-sm text-white/40 tracking-widest uppercase mb-4 block">
            Get In Touch
          </span>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            It&apos;s time to talk
            <br />
            about <span className="gradient-text">your project.</span>
          </h2>
          <p ref={descRef} className="text-white/40 text-lg max-w-xl mt-6 leading-relaxed">
            Let&apos;s embark on a creative journey together by shaping a
            visual narrative of your brand in the crowded digital space.
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            {contactInfo.map((info) => (
              <div key={info.label} className="contact-item group">
                <span className="text-xs text-white/30 tracking-widest uppercase block mb-2">
                  {info.label}
                </span>
                <p className="text-xl sm:text-2xl font-semibold text-white group-hover:translate-x-2 transition-transform duration-300">
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
                    className="social-btn px-5 py-2.5 rounded-full text-sm text-white/50 glass hover:text-white hover:bg-white/5 transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form ref={formRef} className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="form-field">
              <label className="text-xs text-white/30 tracking-widest uppercase block mb-3">
                Your Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/15"
                placeholder="John Doe"
              />
              <div className="field-underline h-px w-full origin-left mt-0" style={{ background: "linear-gradient(90deg, #7c3aed, transparent)", marginTop: "-1px" }} />
            </div>
            <div className="form-field">
              <label className="text-xs text-white/30 tracking-widest uppercase block mb-3">
                Your Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/15"
                placeholder="john@example.com"
              />
              <div className="field-underline h-px w-full origin-left" style={{ background: "linear-gradient(90deg, #7c3aed, transparent)", marginTop: "-1px" }} />
            </div>
            <div className="form-field">
              <label className="text-xs text-white/30 tracking-widest uppercase block mb-3">
                Subject
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/15"
                placeholder="Project Inquiry"
              />
              <div className="field-underline h-px w-full origin-left" style={{ background: "linear-gradient(90deg, #7c3aed, transparent)", marginTop: "-1px" }} />
            </div>
            <div className="form-field">
              <label className="text-xs text-white/30 tracking-widest uppercase block mb-3">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-white/10 pb-3 text-white text-lg focus:outline-none focus:border-violet-500 transition-colors resize-none placeholder:text-white/15"
                placeholder="Tell me about your project..."
              />
              <div className="field-underline h-px w-full origin-left" style={{ background: "linear-gradient(90deg, #7c3aed, transparent)", marginTop: "-1px" }} />
            </div>
            <button
              ref={submitBtnRef}
              type="submit"
              className="mt-4 px-10 py-4 rounded-full font-medium text-white text-lg relative overflow-hidden group inline-block"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Send Message
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
