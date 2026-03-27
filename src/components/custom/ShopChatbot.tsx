import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Sparkles, ShoppingBag, Anchor, Crown, Handshake, Package } from 'lucide-react';
import { functions, httpsCallable } from '@/lib/firebase';
import { getDefaultShopPersona, type ShopAgentPersona } from '@/lib/shop-agent-config';
import { ShopVapiButton } from '@/components/custom/ShopVapiButton';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { icon: ShoppingBag, label: 'Products', prompt: 'What products do you sell? Tell me about UltraShear supplements and your apparel collections.' },
  { icon: Anchor, label: 'Charters', prompt: 'Tell me about your SmartYacht charter experiences. What destinations and packages are available?' },
  { icon: Crown, label: 'Membership', prompt: 'What yacht club membership options do you offer? Tell me about the AC Yacht Club tiers.' },
  { icon: Handshake, label: 'Affiliate', prompt: 'How does your affiliate partner program work? What are the commission rates?' },
  { icon: Package, label: 'Orders', prompt: 'I have a question about my order. What is your shipping and returns policy?' },
];

export function ShopChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [persona] = useState<ShopAgentPersona>(getDefaultShopPersona);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const voiceCopilot = httpsCallable(functions, 'voiceCopilotV1');
      const result = await voiceCopilot({
        utterance: text.trim(),
        context: 'shop',
        systemPrompt: persona.systemPrompt,
        history: messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
      });
      const data = result.data as { reply?: string; response?: string; text?: string; result?: string; message?: string; output?: string };
      const reply = data.reply || data.response || data.text || data.result || data.message || data.output || 'I appreciate your question! For detailed assistance, please visit luxurymarinelife.com or call our concierge team.';

      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      }]);
    } catch (err: any) {
      console.error('[ShopChatbot] Detailed Error:', err);
      const errorMessage = err?.message || err?.details?.message || err?.toString() || 'Connection failed';
      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, persona.systemPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full shadow-xl transition-all duration-400 flex items-center justify-center ${
          isOpen
            ? 'bg-marine-800 border border-white/10 rotate-0'
            : 'bg-gradient-to-br from-teal to-cyan-500 hover:shadow-teal/30 hover:shadow-2xl hover:scale-105'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white/70" />
        ) : (
          <MessageCircle className="w-5.5 h-5.5 text-white" strokeWidth={2} />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold rounded-full border-2 border-marine-900 animate-pulse" />
        )}
      </button>

      {/* Chat Drawer */}
      <div
        className={`fixed bottom-24 right-6 z-[9997] w-[380px] max-w-[calc(100vw-48px)] transition-all duration-400 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-marine-900/95 backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden flex flex-col h-[520px] max-h-[70vh]">

          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.06] bg-marine-800/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal to-cyan-500 flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{persona.name}</h3>
                  <p className="text-white/40 text-xs">AI Shop Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShopVapiButton />
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white/40 text-xs">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-teal/10 border border-teal/15 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-teal/70" />
                </div>
                <p className="text-white/60 text-sm mb-1">Hi! I'm {persona.name}.</p>
                <p className="text-white/35 text-xs mb-5">Ask me about products, charters, or membership.</p>

                {/* Quick Actions */}
                <div className="flex flex-wrap justify-center gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => sendMessage(action.prompt)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/55 text-xs font-medium hover:bg-teal/10 hover:border-teal/20 hover:text-teal transition-all duration-200"
                    >
                      <action.icon className="w-3 h-3" />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-teal/20 text-white/90 rounded-br-md'
                      : 'bg-white/[0.06] text-white/75 rounded-bl-md border border-white/[0.04]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3 border border-white/[0.04]">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-teal/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-teal/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-teal/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2 border-t border-white/[0.04] flex-shrink-0">
            <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl border border-white/[0.08] px-3 py-2 focus-within:border-teal/30 transition-colors duration-200">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, charters..."
                className="flex-1 bg-transparent text-white/85 text-sm placeholder:text-white/30 outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-lg bg-teal/20 flex items-center justify-center text-teal hover:bg-teal/30 disabled:opacity-30 disabled:hover:bg-teal/20 transition-all duration-200"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
}
