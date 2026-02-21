"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const floatingImages = [
  { src: "/images/project-gl.webp", alt: "Grams & Liters", top: "8%", left: "2%", w: 180, h: 130, round: false },
  { src: "/images/project-beyond.webp", alt: "Beyond Living", top: "5%", right: "8%", w: 200, h: 140, round: false },
  { src: "/images/project-xendou.jpg", alt: "Xendou", bottom: "18%", left: "5%", w: 170, h: 120, round: false },
  { src: "/images/project-blvck.jpg", alt: "Blvck", bottom: "12%", right: "3%", w: 190, h: 130, round: false },
  { src: "/images/hero.jpg", alt: "Mohammed Shibili", top: "15%", left: "50%", w: 160, h: 160, round: true },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );

      if (imagesRef.current) {
        const imgs = imagesRef.current.querySelectorAll(".float-img");
        imgs.forEach((img, i) => {
          gsap.fromTo(
            img,
            { scale: 0.8, opacity: 0, y: 40 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: 0.4 + i * 0.15,
            }
          );

          gsap.to(img, {
            y: "random(-12, 12)",
            x: "random(-8, 8)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });
      }

      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 1.5 }
      );

      gsap.to(scrollRef.current, {
        y: 6,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div ref={imagesRef} className="absolute inset-0 pointer-events-none">
        {floatingImages.map((img) => (
          <div
            key={img.alt}
            className={`float-img absolute ${img.round ? "rounded-full" : "rounded-xl"} overflow-hidden shadow-2xl`}
            style={{
              top: img.top,
              left: img.left,
              right: img.right,
              bottom: img.bottom,
              width: img.w,
              height: img.round ? img.w : img.h,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes={`${img.w}px`}
            />
          </div>
        ))}
      </div>

      <h1
        ref={titleRef}
        className="relative z-10 text-center"
      >
        <span className="block text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.9] text-white">
          MOHAMMED
        </span>
        <span className="block text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.9] gradient-text">
          SHIBILI
        </span>
      </h1>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
