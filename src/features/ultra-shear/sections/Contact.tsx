import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Mail } from 'lucide-react';

export function Contact() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section ref={ref} className="section-padding bg-[#FAFAFA]">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className={`font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4 transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            QUESTIONS? WE'RE HERE.
          </h2>
          <a
            href="mailto:cs@shearsciences.com"
            className={`inline-flex items-center gap-2 text-[#8B1A1A] hover:underline mb-12 transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <Mail className="w-5 h-5" />
            cs@shearsciences.com
          </a>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 text-left transition-all duration-700 ${
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="label-text text-gray-500 mb-2 block">
                  NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#8B1A1A] focus:outline-none transition-colors bg-white"
                  required
                />
              </div>
              <div>
                <label className="label-text text-gray-500 mb-2 block">
                  EMAIL
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 focus:border-[#8B1A1A] focus:outline-none transition-colors bg-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="label-text text-gray-500 mb-2 block">
                MESSAGE
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 focus:border-[#8B1A1A] focus:outline-none transition-colors bg-white resize-none"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`btn-primary ${
                  isSubmitted ? 'bg-green-600' : ''
                }`}
                disabled={isSubmitted}
              >
                {isSubmitted ? 'MESSAGE SENT!' : 'SEND MESSAGE'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
