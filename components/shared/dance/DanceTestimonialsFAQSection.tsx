/**
 * Generic Dance Testimonials & FAQ Section
 * Replaces: DancehallTestimonialsFAQSection, HipHopTestimonialsFAQSection, TwerkTestimonialsFAQSection
 * Reduces code duplication by ~95%
 */

import React from 'react';
import AnimateOnScroll from '../../AnimateOnScroll';
import YouTubeEmbed from '../../YouTubeEmbed';
import FAQSection from '../../FAQSection';
import type { Testimonial } from '../../../types/dance-config';

interface TranslationKeys {
  videoTitle: string;
  videoDesc: string;
  whyTodayFullTitle: string;
  whyToday1: string;
  whyToday2: string;
  whyToday3: string;
  whyTodayClosing1: string;
  whyTodayClosing2: string;
  finalCTATitle: string;
  finalCTASubtitle: string;
  finalCTADesc: string;
  finalCTAFunny: string;
  cta1: string;
  cta1Subtext: string;
  cta2: string;
  cta2Subtext: string;
  faqTitle: string;
}

interface DanceTestimonialsFAQSectionProps {
  t: (key: string) => string;
  locale: string;
  testimonials: Testimonial[];
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  pageUrl: string;
  keys: TranslationKeys;
  videoId?: string; // Main YouTube video ID
}

const DanceTestimonialsFAQSection: React.FC<DanceTestimonialsFAQSectionProps> = ({
  t,
  locale,
  testimonials,
  faqs,
  pageUrl,
  keys,
  videoId,
}) => {
  return (
    <>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-8 holographic-text">
                {t('testimonialsNotRequested')}
              </h2>
              <div className="inline-block">
                <div className="mb-4 text-3xl font-black text-neutral">{t('excellent')}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-8 h-8 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-neutral/70">
                  {t('basedOnReviews').replace('{count}', '505')}
                </div>
                <div className="mt-2 text-xs text-neutral/50">Google</div>
              </div>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimateOnScroll key={testimonial.id} delay={index * 100}>
                <div className="flex flex-col h-full p-6 bg-black/50 backdrop-blur-md border border-primary-dark/50 rounded-xl shadow-lg transition-all duration-300 hover:border-primary-accent hover:shadow-accent-glow hover:-translate-y-2">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="flex-grow text-neutral/90 mb-4">
                    <p className="text-sm leading-relaxed">
                      &ldquo;{testimonial.quote[locale as keyof typeof testimonial.quote]}&rdquo;
                    </p>
                  </blockquote>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-primary-dark/30">
                    <div>
                      <cite className="font-bold text-neutral not-italic text-sm">
                        {testimonial.name}
                      </cite>
                      <p className="text-xs text-neutral/75">
                        {testimonial.city[locale as keyof typeof testimonial.city]}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      {videoId && (
        <section id="video" className="py-20 md:py-32 bg-primary-dark/10">
          <div className="container mx-auto px-6">
            <AnimateOnScroll>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-4 holographic-text">
                  {t(keys.videoTitle)}
                </h2>
                <p className="text-lg text-neutral/70">{t(keys.videoDesc)}</p>
              </div>
            </AnimateOnScroll>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              <AnimateOnScroll delay={100}>
                <YouTubeEmbed videoId={videoId} title={t(keys.videoTitle)} />
              </AnimateOnScroll>

              <AnimateOnScroll delay={200}>
                <div className="aspect-video rounded-2xl overflow-hidden border-2 border-primary-accent/50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-6">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-primary-accent/50"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    <p className="text-neutral/70 font-semibold">Video próximamente</p>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={300}>
                <div className="aspect-video rounded-2xl overflow-hidden border-2 border-primary-accent/50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-6">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-primary-accent/50"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    <p className="text-neutral/70 font-semibold">Video próximamente</p>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      )}

      {/* Why Today Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-8 holographic-text">
                {t(keys.whyTodayFullTitle)}
              </h2>
              <p className="text-xl text-neutral/90">{t(keys.whyToday1)}</p>
              <p className="text-xl text-neutral/90">{t(keys.whyToday2)}</p>
              <p className="text-xl text-neutral/90">{t(keys.whyToday3)}</p>
              <p className="text-2xl font-bold holographic-text mt-8">{t(keys.whyTodayClosing1)}</p>
              <p className="text-lg text-neutral/90 italic">{t(keys.whyTodayClosing2)}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="final-cta" className="relative py-20 md:py-32 overflow-hidden">
        {/* Background like Hero */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/30 via-black to-black"></div>
          <div className="absolute inset-0 texture-stardust opacity-20"></div>
        </div>
        <div className="container mx-auto px-6 relative z-20">
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-4 holographic-text">
                {t(keys.finalCTATitle)}
              </h2>
              <p className="text-2xl font-bold mb-6 holographic-text">{t(keys.finalCTASubtitle)}</p>
              <p className="text-xl text-neutral/90 mb-8 leading-relaxed">{t(keys.finalCTADesc)}</p>
              <p className="text-lg text-neutral/90 mb-10 italic">{t(keys.finalCTAFunny)}</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <div className="w-full sm:w-auto">
                  <a
                    href="#contact"
                    className="block w-full sm:w-auto bg-primary-accent text-white font-bold text-lg py-5 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent-glow animate-glow text-center"
                  >
                    {t(keys.cta1)}
                  </a>
                  <p className="text-xs text-neutral/70 mt-2 text-center">{t(keys.cta1Subtext)}</p>
                </div>
                <div className="w-full sm:w-auto">
                  <a
                    href="#trial"
                    className="block w-full sm:w-auto border-2 border-neutral text-neutral font-bold text-lg py-5 px-12 rounded-full transition-all duration-300 hover:bg-neutral hover:text-black text-center"
                  >
                    {t(keys.cta2)}
                  </a>
                  <p className="text-xs text-neutral/70 mt-2 text-center">{t(keys.cta2Subtext)}</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection title={t(keys.faqTitle)} faqs={faqs} pageUrl={pageUrl} />
    </>
  );
};

export default React.memo(DanceTestimonialsFAQSection);
