import { ArrowRight } from "lucide-react";

// A row of serif words joined by small gold arrows: Match, Compare, Price, Review.
export default function StepWords({ steps, light = false }: { steps: string[]; light?: boolean }) {
  return (
    <ol className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xl ${light ? "text-lfg" : "text-fg"}`}>
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-3">
          <span>{s}</span>
          {i < steps.length - 1 && <ArrowRight aria-hidden size={14} className="text-accent" />}
        </li>
      ))}
    </ol>
  );
}
