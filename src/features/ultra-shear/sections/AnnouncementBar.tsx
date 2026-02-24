import { useCountdown } from '@/hooks/useCountdown';
import { Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  const { hours, minutes, seconds } = useCountdown(72);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-[#8B1A1A] text-white py-2 sm:py-2.5 px-3 sm:px-4 animate-slide-down">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6 text-center">
        <p className="text-[10px] leading-tight sm:text-sm font-medium tracking-wide">
          <span className="sm:hidden">LIMITED-TIME ACCESS ENDING</span>
          <span className="hidden sm:inline">LIMITED-TIME ACCESS ENDING - Lock in UltraShear Technology™ at Historic Pricing</span>
        </p>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 font-mono text-xs sm:text-sm">
            <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              {formatNumber(hours)}
            </span>
            <span>:</span>
            <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              {formatNumber(minutes)}
            </span>
            <span>:</span>
            <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded animate-countdown">
              {formatNumber(seconds)}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 bg-white/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs animate-pulse-subtle">
            <Sparkles className="w-3 h-3" />
            20% SUPER SALE: Limited Stock
          </span>
        </div>
      </div>
    </div>
  );
}
