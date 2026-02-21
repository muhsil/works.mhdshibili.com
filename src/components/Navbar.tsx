"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Services", href: "#services", num: "01" },
  { label: "Works", href: "#works", num: "02" },
  { label: "About", href: "#about", num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const menuInfoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const openMenu = useCallback(() => {
    if (!menuRef.current || !overlayRef.current) return;
    const menu = menuRef.current;
    const overlay = overlayRef.current;

    menu.style.display = "flex";
    overlay.style.display = "block";

    const tl = gsap.timeline();
    menuTlRef.current = tl;

    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });

    tl.fromTo(
      menu.querySelectorAll(".menu-column"),
      { yPercent: 100 },
      { yPercent: 0, duration: 0.8, stagger: 0.1, ease: "power4.inOut" },
      0
    );

    tl.fromTo(
      menu.querySelectorAll(".menu-link-text"),
      { yPercent: 120, rotateX: -40 },
      {
        yPercent: 0,
        rotateX: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
      },
      0.4
    );

    tl.fromTo(
      menu.querySelectorAll(".menu-link-num"),
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power3.out" },
      0.5
    );

    tl.fromTo(
      menu.querySelectorAll(".menu-line"),
      { scaleX: 0 },
      { scaleX: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
      0.5
    );

    if (menuInfoRef.current) {
      tl.fromTo(
        menuInfoRef.current.querySelectorAll(".menu-info-item"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power3.out" },
        0.7
      );
    }
  }, []);

  const closeMenu = useCallback(() => {
    if (!menuRef.current || !overlayRef.current) return;
    const menu = menuRef.current;
    const overlay = overlayRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        menu.style.display = "none";
        overlay.style.display = "none";
      },
    });

    tl.to(menu.querySelectorAll(".menu-link-text"), {
      yPercent: -120,
      stagger: 0.04,
      duration: 0.4,
      ease: "power3.in",
    });

    tl.to(
      menu.querySelectorAll(".menu-column"),
      { yPercent: -100, duration: 0.6, stagger: 0.05, ease: "power4.inOut" },
      0.2
    );

    tl.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.3);

    menuTlRef.current = tl;
  }, []);

  useEffect(() => {
    if (isOpen) {
      openMenu();
    } else if (menuTlRef.current) {
      closeMenu();
    }
  }, [isOpen, openMenu, closeMenu]);

  // Magnetic button effect for desktop nav links
  useEffect(() => {
    const links = document.querySelectorAll(".nav-magnetic");
    const handlers: Array<{ el: Element; move: (e: MouseEvent) => void; leave: () => void }> = [];

    links.forEach((link) => {
      const move = (e: MouseEvent) => {
        const rect = (link as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
      };
      const leave = () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };
      link.addEventListener("mousemove", move as EventListener);
      link.addEventListener("mouseleave", leave);
      handlers.push({ el: link, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move as EventListener);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "glass py-4" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            ref={logoRef}
            href="#"
            className="text-xl font-bold tracking-tight"
          >
            <span className="gradient-text">Mohammed</span>{" "}
            <span className="text-white">Shibili</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-magnetic text-sm text-white/60 hover:text-white transition-colors duration-300 tracking-wide inline-block"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="nav-magnetic px-5 py-2.5 rounded-full text-sm font-medium text-white gradient-border hover:bg-white/5 transition-colors duration-300 inline-block"
            >
              Hire Me
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 flex items-center justify-center z-[60]"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        style={{ display: "none" }}
        onClick={() => setIsOpen(false)}
      />

      {/* Full-screen creative menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 flex-col hidden"
        style={{ zIndex: 45 }}
      >
        {/* Background columns that slide up */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="menu-column flex-1 h-full"
              style={{
                background: i % 2 === 0 ? "rgba(10, 10, 10, 0.98)" : "rgba(15, 15, 15, 0.98)",
              }}
            />
          ))}
        </div>

        {/* Menu content */}
        <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 w-full">
          <div ref={linksContainerRef} className="flex-1 flex flex-col justify-center">
            {navLinks.map((link, index) => (
              <div key={link.label}>
                <div
                  className="menu-line h-px w-full origin-left"
                  style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3), transparent)" }}
                />
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-6 py-4 sm:py-6 md:py-8"
                >
                  <span className="menu-link-num text-sm font-mono text-white/20 w-8">
                    {link.num}
                  </span>
                  <div className="overflow-hidden" style={{ perspective: "600px" }}>
                    <span
                      className="menu-link-text block text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white/90 tracking-tighter group-hover:text-white transition-colors duration-300"
                      style={{ transformOrigin: "bottom" }}
                    >
                      {link.label}
                    </span>
                  </div>
                  <div className="hidden md:flex items-center gap-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm text-white/40">{link.href.replace("#", "")}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40 transform group-hover:translate-x-2 transition-transform duration-300">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
                {index === navLinks.length - 1 && (
                  <div
                    className="menu-line h-px w-full origin-left"
                    style={{ background: "linear-gradient(90deg, rgba(124,58,237,0.3), transparent)" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Bottom info */}
          <div ref={menuInfoRef} className="pb-8 sm:pb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="flex flex-wrap gap-6 sm:gap-12">
              <div className="menu-info-item">
                <span className="text-xs text-white/20 tracking-widest uppercase block mb-2">Email</span>
                <a href="mailto:contact@mhdshibili.com" className="text-sm text-white/60 hover:text-white transition-colors">
                  contact@mhdshibili.com
                </a>
              </div>
              <div className="menu-info-item">
                <span className="text-xs text-white/20 tracking-widest uppercase block mb-2">Phone</span>
                <span className="text-sm text-white/60">+91 859 297 3911</span>
              </div>
            </div>
            <div className="flex gap-4 menu-info-item">
              {["Instagram", "Twitter", "LinkedIn", "Behance"].map((s) => (
                <a key={s} href="#" className="text-xs text-white/30 hover:text-white/70 transition-colors tracking-wide">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
