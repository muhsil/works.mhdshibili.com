"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Hide on mobile/touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = "none";
      follower.style.display = "none";
      return;
    }

    // Set initial position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleMouseEnterInteractive = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      gsap.to(follower, { scale: 1.8, duration: 0.3, borderColor: "rgba(124, 58, 237, 0.6)" });
    };

    const handleMouseLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, duration: 0.3, borderColor: "rgba(255, 255, 255, 0.3)" });
    };

    const handleMouseEnterProject = () => {
      gsap.to(cursor, { scale: 0, duration: 0.3 });
      gsap.to(follower, {
        scale: 3,
        duration: 0.4,
        backgroundColor: "rgba(124, 58, 237, 0.15)",
        borderColor: "rgba(124, 58, 237, 0.5)",
      });
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      }
    };

    const handleMouseLeaveProject = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, {
        scale: 1,
        duration: 0.4,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.3)",
      });
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button, input, textarea, .service-card");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    const projects = document.querySelectorAll(".work-card");
    projects.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterProject);
      el.addEventListener("mouseleave", handleMouseLeaveProject);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      projects.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterProject);
        el.removeEventListener("mouseleave", handleMouseLeaveProject);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ backgroundColor: "#fff" }}
      />
      <div
        ref={followerRef}
        className="cursor-follower fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.3)",
          backgroundColor: "transparent",
        }}
      >
        <span
          ref={textRef}
          className="text-[6px] font-bold uppercase tracking-wider text-white opacity-0 scale-50"
        >
          View
        </span>
      </div>
    </>
  );
}
