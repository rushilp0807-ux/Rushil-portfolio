import { useEffect, useRef } from "react";

// Hero canvas: a particle network on a jittered grid with thin lines between
// neighbours and a mouse-repulsion force. Pauses for prefers-reduced-motion.
type P = { x: number; y: number; ox: number; oy: number; vx: number; vy: number };

export default function FractalBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let raf = 0;
    let parts: P[] = [];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = 12;
      const rows = 8;
      parts = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = ((c + 0.5 + (Math.random() - 0.5) * 0.7) / cols) * w;
          const y = ((r + 0.5 + (Math.random() - 0.5) * 0.7) / rows) * h;
          parts.push({ x, y, ox: x, oy: y, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15 });
        }
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (!reduce) {
          p.ox += p.vx;
          p.oy += p.vy;
          if (p.ox < 0 || p.ox > w) p.vx *= -1;
          if (p.oy < 0 || p.oy > h) p.vy *= -1;
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < 120 && d > 0) {
            p.x += (dx / d) * (120 - d) * 0.04;
            p.y += (dy / d) * (120 - d) * 0.04;
          }
          p.x += (p.ox - p.x) * 0.03;
          p.y += (p.oy - p.y) * 0.03;
        }
      }
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const d = Math.hypot(parts[i].x - parts[j].x, parts[i].y - parts[j].y);
          if (d < 170) {
            ctx.strokeStyle = `rgba(244,246,252,${0.34 * (1 - d / 170)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(parts[i].x, parts[i].y);
            ctx.lineTo(parts[j].x, parts[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "rgba(244,246,252,0.75)";
      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onResize = () => build();

    build();
    frame();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
