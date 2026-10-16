import { useEffect, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

type Props = { src?: string; alt: string; className?: string };

export default function ModelViewerWrapper({ src, alt, className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    const onLoad = () => setStatus("ready");
    const onError = () => setStatus("error");
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
    };
  }, [src]);

  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-card text-sm text-muted ${className}`} role="img" aria-label={alt}>
        3D model coming soon
      </div>
    );
  }

  return (
    <div className={`relative bg-card ${className}`}>
      <model-viewer
        ref={ref}
        src={src}
        alt={alt}
        camera-controls
        autoplay
        auto-rotate
        rotation-per-second="10deg"
        environment-image="neutral"
        interaction-prompt="none"
        shadow-intensity="0.6"
        exposure="1.1"
        tone-mapping="neutral"
        style={{ width: "100%", height: "100%", background: "transparent" }}
      />
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">Loading model</div>
      )}
      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">Model failed to load</div>
      )}
      {status === "ready" && (
        <span className="pointer-events-none absolute bottom-3 left-4 text-xs text-muted">Drag to rotate, scroll to zoom. Plays an exploded view.</span>
      )}
    </div>
  );
}
