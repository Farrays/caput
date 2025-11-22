/**
 * Generic Dance Transformation Section
 * Replaces: DancehallTransformationSection, HipHopTransformationSection, TwerkTransformationSection
 * Reduces code duplication by ~95%
 */

import React from 'react';
import AnimateOnScroll from '../../AnimateOnScroll';
import AnimatedCounter from '../../AnimatedCounter';

interface DanceTransformationSectionProps {
  t: (key: string) => string;
  transformTitleKey: string;
  transformCTAKey: string;
  transformPrefix: string; // e.g., 'dhV3Transform', 'hipHopTransform', 'twkTransform'
  whyChoosePrefix: string; // e.g., 'dhV3WhyChoose', 'hipHopWhyChoose', 'twkWhyChoose'
}

const DanceTransformationSection: React.FC<DanceTransformationSectionProps> = ({
  t,
  transformTitleKey,
  transformCTAKey,
  transformPrefix,
  whyChoosePrefix,
}) => {
  return (
    <>
      {/* Transformation Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-4 holographic-text">
                {t(transformTitleKey)}
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {[1, 2, 3, 4, 5].map((num, index) => (
              <AnimateOnScroll key={num} delay={index * 100} className="[perspective:1000px]">
                <div className="group h-full p-8 bg-black/50 backdrop-blur-md border border-primary-dark/50 hover:border-primary-accent rounded-2xl transition-all duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-0.5rem)_scale(1.05)_rotateY(5deg)] hover:shadow-accent-glow">
                  <div className="text-6xl font-black text-primary-accent mb-4 holographic-text">
                    {num}
                  </div>
                  <h3 className="text-xl font-bold text-neutral mb-3">
                    {t(`${transformPrefix}${num}Title`)}
                  </h3>
                  <p className="text-neutral/90 leading-relaxed">
                    {t(`${transformPrefix}${num}Desc`)}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
            <AnimateOnScroll delay={500} className="[perspective:1000px]">
              <div className="group h-full p-8 bg-black/50 backdrop-blur-md border border-primary-dark/50 hover:border-primary-accent rounded-2xl transition-all duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-0.5rem)_scale(1.05)_rotateY(5deg)] hover:shadow-accent-glow">
                <div className="text-6xl font-black text-primary-accent mb-4 holographic-text">
                  6
                </div>
                <h3 className="text-xl font-bold text-neutral mb-3">
                  {t(`${transformPrefix}6Title`)}
                </h3>
                <p className="text-neutral/90 leading-relaxed">{t(`${transformPrefix}6Desc`)}</p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Why Choose Farray's Section */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-4 holographic-text">
                {t(transformCTAKey)}
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {[1, 2, 3, 4, 5, 6].map((num, index) => (
              <AnimateOnScroll key={num} delay={index * 100} className="[perspective:1000px]">
                <div className="group h-full p-6 bg-primary-dark/20 rounded-xl border border-primary-dark/50 hover:border-primary-accent transition-all duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-0.5rem)_scale(1.05)_rotateY(5deg)] hover:shadow-accent-glow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-accent/20 flex items-center justify-center group-hover:bg-primary-accent/40 transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-primary-accent"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral mb-2">
                        {t(`${whyChoosePrefix}${num}Title`)}
                      </h3>
                      <p className="text-neutral/90 text-sm leading-relaxed">
                        {t(`${whyChoosePrefix}${num}Desc`)}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
            <AnimateOnScroll delay={500} className="[perspective:1000px] md:col-start-2">
              <div className="group h-full p-6 bg-primary-dark/20 rounded-xl border border-primary-dark/50 hover:border-primary-accent transition-all duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-0.5rem)_scale(1.05)_rotateY(5deg)] hover:shadow-accent-glow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-accent/20 flex items-center justify-center group-hover:bg-primary-accent/40 transition-colors duration-300">
                    <svg
                      className="w-6 h-6 text-primary-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral mb-2">
                      {t(`${whyChoosePrefix}7Title`)}
                    </h3>
                    <p className="text-neutral/90 text-sm leading-relaxed">
                      {t(`${whyChoosePrefix}7Desc`)}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Trust Bar - Stats */}
          <AnimateOnScroll>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 max-w-5xl mx-auto">
              <div className="text-center">
                <AnimatedCounter
                  target={8}
                  suffix="+"
                  className="text-4xl md:text-5xl font-black mb-2 holographic-text"
                />
                <p className="text-sm md:text-base text-neutral/90 font-semibold">
                  Años de Experiencia
                </p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  target={1500}
                  suffix="+"
                  className="text-4xl md:text-5xl font-black mb-2 holographic-text"
                />
                <p className="text-sm md:text-base text-neutral/90 font-semibold">
                  Estudiantes Activos
                </p>
              </div>
              <div className="text-center">
                <AnimatedCounter
                  target={15000}
                  suffix="+"
                  className="text-4xl md:text-5xl font-black mb-2 holographic-text"
                />
                <p className="text-sm md:text-base text-neutral/90 font-semibold">
                  Alumnos Satisfechos
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
};

export default React.memo(DanceTransformationSection);
