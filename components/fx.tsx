"use client";

import { useEffect, useRef } from "react";

/* Pointer-driven 3D tilt with a moving glare. Ignores touch input. */
export function Tilt({
  children,
  className = "",
  max = 9,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * 2 * max}deg`);
    el.style.setProperty("--rx", `${-(y - 0.5) * 2 * max}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="tilt-wrap">
      <div ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
        <span className="tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}

const FACES = ["WEB", "MOBILE", "CLOUD", "AI", "DATA", "UX"];
const CHIPS = [
  { text: "deploy ✓", z: "90px", style: { top: "6%", left: "-2%", animationDelay: "0s" } },
  { text: "99.99% uptime", z: "130px", style: { bottom: "14%", right: "-4%", animationDelay: "-2s" } },
  { text: "{ ship: true }", z: "60px", style: { bottom: "2%", left: "8%", animationDelay: "-4s" } },
];

/* Decorative spinning glass cube, orbit rings and floating chips. */
export function Hero3D() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={sceneRef} className="scene" aria-hidden="true">
      <div className="scene__glow" />
      <div className="rig">
        <span className="ring ring-a" />
        <span className="ring ring-b" />
        <div className="cube">
          {FACES.map((f, i) => (
            <div key={f} className={`cube-face face-${i}`}>
              <i className="corner c1" />
              <i className="corner c2" />
              <i className="corner c3" />
              <i className="corner c4" />
              {f}
            </div>
          ))}
          <span className="cube-core" />
        </div>
        {CHIPS.map((c) => (
          <span key={c.text} className="chip" style={{ ["--z" as string]: c.z, ...c.style }}>
            {c.text}
          </span>
        ))}
      </div>
    </div>
  );
}
