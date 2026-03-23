import { useState, type ReactNode } from 'react';
import { X, Info } from 'lucide-react';

interface InfoPopupProps {
  /** Button label shown next to the info icon */
  label?: string;
  /** Content rendered inside the popup overlay */
  children: ReactNode;
  /** Optional classname override for the trigger button */
  className?: string;
}

/**
 * Minimal info popup — click to reveal detail overlay.
 * Used on Statement sections to keep visual real-estate clean
 * while surfacing supporting facts behind a "Learn More" tap.
 */
export function InfoPopup({ label = 'Learn More', children, className }: InfoPopupProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 text-white/70 hover:text-teal text-xs font-medium tracking-wide transition-colors duration-200 ${className ?? ''}`}
        aria-label={label}
      >
        <Info className="w-3.5 h-3.5" />
        {label}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-marine-900/92 backdrop-blur-md" />

          {/* Panel */}
          <div
            className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-marine-800/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-white/80 text-sm leading-relaxed space-y-3">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
