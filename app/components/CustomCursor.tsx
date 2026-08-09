"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const glow = document.querySelector(".cursor-glow") as HTMLElement;

    if (!cursor || !follower || !glow) return;

    // -----------------------------
    // CURSOR + GLOW
    // -----------------------------

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.9,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // -----------------------------
// MAGNETIC BUTTONS
// -----------------------------

const magneticElements =
  document.querySelectorAll<HTMLElement>(".magnetic");

const magneticHandlers: {
  element: HTMLElement;
  move: (e: MouseEvent) => void;
  leave: () => void;
}[] = [];

magneticElements.forEach((element) => {
  const handleMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();

    const x =
      e.clientX -
      (rect.left + rect.width / 2);

    const y =
      e.clientY -
      (rect.top + rect.height / 2);

    gsap.to(element, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  element.addEventListener(
    "mousemove",
    handleMove
  );

  element.addEventListener(
    "mouseleave",
    handleLeave
  );

  magneticHandlers.push({
    element,
    move: handleMove,
    leave: handleLeave,
  });
});

    // -----------------------------
    // CLEANUP
    // -----------------------------

    return () => {
  window.removeEventListener(
    "mousemove",
    moveCursor
  );

  magneticHandlers.forEach(
    ({ element, move, leave }) => {
      element.removeEventListener(
        "mousemove",
        move
      );

      element.removeEventListener(
        "mouseleave",
        leave
      );
    }
  );
};
  }, []);

  return (
    <>
      <div className="cursor-glow" />

      <div
        ref={cursorRef}
        className="custom-cursor"
      />

      <div
        ref={followerRef}
        className="cursor-follower"
      />
    </>
  );
}