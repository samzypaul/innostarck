"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/images/hero-1-fiber.jpg", alt: "Fiber optic cables radiating light" },
  { src: "/images/hero-2-server.jpg", alt: "Server rack cabling in a data center" },
  { src: "/images/hero-3-circuit.jpg", alt: "Macro shot of a circuit board" },
];

const INTERVAL_MS = 4500;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {SLIDES.map((slide, i) => (
        <div key={slide.src} className="hero__slide" data-active={i === active}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 980px) 100vw, 620px"
            priority={i === 0}
          />
        </div>
      ))}
    </>
  );
}
