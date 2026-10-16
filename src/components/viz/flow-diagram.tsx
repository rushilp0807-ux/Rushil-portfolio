import { ArrowDown, ArrowRight, Repeat } from "lucide-react";
import type { FlowStep } from "@/data/portfolio";

export default function FlowDiagram({ steps, loop }: { steps: FlowStep[]; loop?: string }) {
  return (
    <div>
      <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-stretch">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
            <div className="flex-1 rounded-xl border border-line bg-bg p-4">
              <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 text-base font-semibold leading-tight">{s.title}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{s.detail}</p>
            </div>
            {i < steps.length - 1 && (
              <>
                <ArrowRight aria-hidden size={18} className="hidden shrink-0 text-muted md:block" />
                <ArrowDown aria-hidden size={18} className="mx-auto shrink-0 text-muted md:hidden" />
              </>
            )}
          </li>
        ))}
      </ol>
      {loop && (
        <p className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
          <Repeat size={14} aria-hidden className="text-accent" />
          {loop}
        </p>
      )}
    </div>
  );
}
