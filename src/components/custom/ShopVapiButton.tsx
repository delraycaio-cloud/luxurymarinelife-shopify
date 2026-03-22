import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { getDefaultShopPersona } from '@/lib/shop-agent-config';

type CallStatus = 'idle' | 'connecting' | 'active' | 'ending';

export function ShopVapiButton() {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [volume, setVolume] = useState(0);
  const vapiRef = useRef<any>(null);

  const cleanup = useCallback(() => {
    if (vapiRef.current) {
      try { vapiRef.current.stop(); } catch { /* ignore */ }
      vapiRef.current = null;
    }
    setStatus('idle');
    setVolume(0);
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const toggleCall = useCallback(async () => {
    if (status === 'active' || status === 'connecting') {
      cleanup();
      return;
    }

    setStatus('connecting');

    try {
      const { default: Vapi } = await import('@vapi-ai/web');
      const vapi = new Vapi('8a9f8eae-dd82-4a93-b721-8d73d44544e5');
      vapiRef.current = vapi;

      const persona = getDefaultShopPersona();

      vapi.on('call-start', () => setStatus('active'));
      vapi.on('call-end', () => { setStatus('idle'); setVolume(0); });
      vapi.on('volume-level', (v: number) => setVolume(v));
      vapi.on('error', (err: any) => {
        console.error('[ShopVapi] Error:', err);
        cleanup();
      });

      await vapi.start({
        model: {
          provider: 'google' as any,
          model: 'gemini-2.0-flash' as any,
          messages: [{ role: 'system', content: persona.systemPrompt }],
        },
        voice: {
          provider: 'eleven-labs' as any,
          voiceId: persona.voiceId,
        },
        name: `LML Shop – ${persona.name}`,
        firstMessage: persona.greeting,
      } as any);
    } catch (err) {
      console.error('[ShopVapi] Start error:', err);
      cleanup();
    }
  }, [status, cleanup]);

  const pulseScale = status === 'active' ? 1 + volume * 0.35 : 1;

  return (
    <button
      onClick={toggleCall}
      className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
        status === 'active'
          ? 'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30'
          : status === 'connecting'
          ? 'bg-teal/15 border border-teal/25 text-teal animate-pulse'
          : 'bg-white/[0.06] border border-white/[0.1] text-white/50 hover:bg-teal/10 hover:border-teal/20 hover:text-teal'
      }`}
      style={{ transform: `scale(${pulseScale})` }}
      aria-label={status === 'active' ? 'End voice call' : 'Start voice assistant'}
      title={status === 'active' ? 'Tap to end call' : 'Talk to Marina (AI Voice Assistant)'}
    >
      {status === 'connecting' ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : status === 'active' ? (
        <MicOff className="w-4 h-4" />
      ) : (
        <Mic className="w-4 h-4" />
      )}

      {/* Active call ring */}
      {status === 'active' && (
        <span className="absolute inset-0 rounded-xl border-2 border-red-400/30 animate-ping" />
      )}
    </button>
  );
}
