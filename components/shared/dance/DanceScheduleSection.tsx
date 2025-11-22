/**
 * Generic Dance Schedule Section
 * Replaces: DancehallScheduleSection, HipHopScheduleSection, TwerkScheduleSection
 * Reduces code duplication by ~90% (logos section is 100% duplicated)
 */

import React from 'react';
import AnimateOnScroll from '../../AnimateOnScroll';
import ScheduleSection from '../../ScheduleSection';
import type { TeacherInfo, Schedule } from '../../../types/dance-config';

interface DanceScheduleSectionProps {
  t: (key: string) => string;
  schedules: Schedule[];
  logosTitleKey: string;
  logosIntlFestivalsTextKey: string;
  teachersTitleKey: string;
  teachersSubtitleKey: string;
  teachersClosingKey: string;
  scheduleTitleKey: string;
  scheduleSubtitleKey: string;
  teachers?: TeacherInfo[];
  backgroundImage?: string;
}

const DanceScheduleSection: React.FC<DanceScheduleSectionProps> = ({
  t,
  schedules,
  logosTitleKey,
  logosIntlFestivalsTextKey,
  teachersTitleKey,
  teachersSubtitleKey,
  teachersClosingKey,
  scheduleTitleKey,
  scheduleSubtitleKey,
  teachers,
  backgroundImage,
}) => {
  return (
    <>
      {/* Logos Section - Nos has podido ver en (100% duplicated across all dance pages) */}
      <section className="py-16 md:py-20 bg-primary-dark/10">
        <div className="container mx-auto px-6">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral mb-8 holographic-text">
                {t(logosTitleKey)}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto items-center mb-8">
                <div className="flex flex-col items-center gap-3 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-primary-accent/20 hover:border-primary-accent transition-all duration-300 hover:scale-105">
                  <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src="/images/cid-unesco-logo.webp"
                      alt="CID UNESCO - Consejo Internacional de la Danza"
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-neutral/90 font-bold text-sm text-center">CID UNESCO</div>
                </div>
                <div className="flex flex-col items-center gap-3 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-primary-accent/20 hover:border-primary-accent transition-all duration-300 hover:scale-105">
                  <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src="/images/Street-Dance-2.webp"
                      alt="Street Dance 2 - Película de danza urbana"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-neutral/90 font-bold text-sm text-center">
                    Street Dance 2
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-primary-accent/20 hover:border-primary-accent transition-all duration-300 hover:scale-105">
                  <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src="/images/the-dancer-espectaculo-baile-cuadrada.webp"
                      alt="The Dancer - Espectáculo de baile"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-neutral/90 font-bold text-sm text-center">The Dancer</div>
                </div>
                <div className="flex flex-col items-center gap-3 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-primary-accent/20 hover:border-primary-accent transition-all duration-300 hover:scale-105">
                  <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-lg">
                    <img
                      src="/images/telecinco-logo.webp"
                      alt="Telecinco - Cadena de televisión española"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-neutral/90 font-bold text-sm text-center">TV 5</div>
                </div>
              </div>
              <p className="text-4xl md:text-5xl font-black tracking-tighter holographic-text">
                {t(logosIntlFestivalsTextKey)}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Teachers Section */}
      {teachers && teachers.length > 0 && (
        <section id="teachers" className="py-20 md:py-32 bg-black relative overflow-hidden">
          {/* Background Image (optional) */}
          {backgroundImage && (
            <div className="absolute inset-0 opacity-30">
              <img
                src={backgroundImage}
                alt="Dance culture background"
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.9)' }}
              />
            </div>
          )}

          <div className="container mx-auto px-6 relative z-10">
            <AnimateOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral holographic-text">
                  {t(teachersTitleKey)}
                </h2>
                <p className="text-xl text-neutral/70 mt-4">{t(teachersSubtitleKey)}</p>
              </div>
            </AnimateOnScroll>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {teachers.map((teacher, index) => (
                <AnimateOnScroll
                  key={teacher.name}
                  delay={(index + 1) * 100}
                  className="[perspective:1000px]"
                >
                  <div className="group h-full bg-black/70 backdrop-blur-md border border-primary-dark/50 hover:border-primary-accent rounded-2xl shadow-lg p-8 transition-all duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-0.5rem)_scale(1.05)_rotateY(5deg)] hover:shadow-accent-glow">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary-accent/50 group-hover:border-primary-accent transition-colors duration-300 mb-6">
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral mb-2">{teacher.name}</h3>
                      <p className="text-primary-accent font-semibold mb-4">
                        {t(teacher.specialtyKey)}
                      </p>
                      <p className="text-neutral/90 leading-relaxed">{t(teacher.bioKey)}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll>
              <p className="text-center text-lg text-neutral/90 mt-12 max-w-2xl mx-auto">
                {t(teachersClosingKey)}
              </p>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Schedule Component */}
      <ScheduleSection
        titleKey={scheduleTitleKey}
        subtitleKey={scheduleSubtitleKey}
        schedules={schedules}
        t={t}
      />
    </>
  );
};

export default React.memo(DanceScheduleSection);
