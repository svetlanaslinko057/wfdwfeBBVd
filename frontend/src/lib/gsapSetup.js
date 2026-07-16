// gsapSetup.js — єдина точка реєстрації GSAP-плагінів.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Стандартний reveal секційних заголовків: line-mask + fade. Викликати всередині useGSAP.
export const revealSection = (q, { reduced } = {}) => {
  if (reduced) return;
  const lines = q(".reveal-line");
  if (lines.length) {
    gsap.fromTo(
      lines,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: lines[0], start: "top 85%", once: true },
      }
    );
  }
  const fades = q(".reveal-fade");
  fades.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      }
    );
  });
  const hairs = q(".reveal-hairline");
  hairs.forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      }
    );
  });
};

export { gsap, ScrollTrigger, useGSAP };
