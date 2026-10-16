import { ArrowDown, ArrowRight, Repeat } from "lucide-react";
import type { FlowStep } from "@/data/portfolio";

// Drawn for light sections. Sharp corners and hairline borders.
export default function FlowDiagram({ steps, loop }: { steps: FlowStep[]; loop?: string }) {
  return (
    <div>
      <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-stretch">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
            <div className="flex-1 border border-lline bg-lbg p-4">
              <p className="nums text-sm text-lmuted">{i + 1}</p>
              <p className="mt-1 font-display text-2xl leading-tight text-lfg">{s.title}</p>
              <p className="mt-1 text-sm leading-snug text-lmuted">{s.detail}</p>
            </div>
            {i < steps.length - 1 && (
              <>
                <ArrowRight aria-hidden size={18} className="hidden shrink-0 text-accent md:block" />
                <ArrowDown aria-hidden size={18} className="mx-auto shrink-0 text-accent md:hidden" />
              </>
            )}
          </li>
        ))}
      </ol>
      {loop && (
        <p className="mt-3 flex items-center gap-2 text-sm text-lmuted">
          <Repeat size={14} aria-hidden className="text-accent" />
          {loop}
        </p>
      )}
    </div>
  );
}
