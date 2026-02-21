"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 });
    }
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(menuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        menuRef.current.querySelectorAll(".menu-link"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.15 }
      );
    }
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-4 bg-black/80 backdrop-blur-md border-b border-white/5" : "py-6"}`}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex items-center justify-between">
          <a href="#" className="text-lg font-semibold tracking-tight">
            <span className="gradient-text">MHD</span>
            <span className="text-white">SHIBILI</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden relative w-10 h-10 flex items-center justify-center z-[60]" aria-label="Toggle menu">
            <div className="flex flex-col gap-1.5">
              <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div ref={menuRef} className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="menu-link text-4xl font-bold text-white/80 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
