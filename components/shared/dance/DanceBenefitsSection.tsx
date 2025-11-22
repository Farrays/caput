/**
 * Generic Dance Benefits Section ("What is X?" section)
 * Replaces: DancehallBenefitsSection, HipHopBenefitsSection, TwerkBenefitsSection
 * Reduces code duplication by 95% (~130 lines → ~7 lines per usage)
 */

import React from 'react';
import AnimateOnScroll from '../../AnimateOnScroll';
import type { TranslationKeyPrefixes } from '../../../types/dance-config';

interface DanceBenefitsSectionProps {
  t: (key: string) => string;
  keys: TranslationKeyPrefixes;
  image: string;
  imageAlt: string;
}

const DanceBenefitsSection: React.FC<DanceBenefitsSectionProps> = ({
  t,
  keys,
  image,
  imageAlt,
}) => {
  return (
    <section className="py-20 md:py-32 bg-primary-dark/10">
      <div className="container mx-auto px-6">
        <AnimateOnScroll>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-8 text-center holographic-text">
              {t(keys.whatIsTitle)}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-lg text-neutral/90 leading-relaxed">
                <p className="text-xl font-semibold holographic-text">{t(keys.whatIsP1)}</p>
                <p>{t(keys.whatIsP2)}</p>
                <p className="italic font-medium text-neutral">{t(keys.whatIsP3)}</p>
                <p>{t(keys.whatIsP4)}</p>
                <p className="text-center text-2xl font-bold mt-8 holographic-text">
                  {t(keys.whatIsQuestionTitle)}
                </p>
                <p className="text-center text-xl font-semibold">{t(keys.whatIsQuestionAnswer)}</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default React.memo(DanceBenefitsSection);
