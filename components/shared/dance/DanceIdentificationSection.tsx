/**
 * Generic Dance Identification Section
 * Replaces: DancehallIdentificationSection, HipHopIdentificationSection, TwerkIdentificationSection
 * Reduces code duplication by ~95%
 */

import React from 'react';
import AnimateOnScroll from '../../AnimateOnScroll';
import type { TranslationKeyPrefixes } from '../../../types/dance-config';

interface DanceIdentificationSectionProps {
  t: (key: string) => string;
  keys: TranslationKeyPrefixes;
}

const DanceIdentificationSection: React.FC<DanceIdentificationSectionProps> = ({ t, keys }) => {
  return (
    <>
      {/* Identification Section - ¿Te identificas? */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-8 holographic-text">
                {t(keys.identifyTitle)}
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {[1, 2, 3, 4, 5].map((num, index) => (
              <AnimateOnScroll key={num} delay={index * 100} className="[perspective:1000px]">
                <div className="group relative h-full flex items-start gap-4 p-6 bg-primary-dark/20 rounded-xl border border-primary-dark/50 hover:border-primary-accent transition-all duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-0.5rem)_scale(1.05)_rotateY(5deg)] hover:shadow-accent-glow">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent/20 flex items-center justify-center group-hover:bg-primary-accent/40 transition-colors duration-300">
                    <svg
                      className="w-5 h-5 text-primary-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-neutral/90 leading-relaxed">{t(keys[`identify${num}` as keyof typeof keys] as string)}</p>
                </div>
              </AnimateOnScroll>
            ))}
            <AnimateOnScroll delay={500} className="[perspective:1000px]">
              <div className="group relative h-full flex items-start gap-4 p-6 bg-primary-dark/20 rounded-xl border border-primary-dark/50 hover:border-primary-accent transition-all duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-0.5rem)_scale(1.05)_rotateY(5deg)] hover:shadow-accent-glow">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-accent/20 flex items-center justify-center group-hover:bg-primary-accent/40 transition-colors duration-300">
                  <svg
                    className="w-5 h-5 text-primary-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-neutral/90 leading-relaxed">{t(keys.identify6)}</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Nueva Sección - Necesitas apuntarte */}
      <section className="py-20 md:py-32 bg-primary-dark/10">
        <div className="container mx-auto px-6">
          {/* Texto de transición pequeño */}
          <AnimateOnScroll>
            <div className="text-center mb-8">
              <p className="text-sm text-neutral/75 italic max-w-2xl mx-auto">
                {t(keys.identifyTransition)}
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-8 holographic-text">
                {t(keys.needEnrollTitle)}
              </h2>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <p className="text-xl text-neutral/90 leading-relaxed">{t(keys.needEnrollP1)}</p>
              <p className="text-lg text-neutral/80 leading-relaxed">{t(keys.needEnrollP2)}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

export default React.memo(DanceIdentificationSection);
