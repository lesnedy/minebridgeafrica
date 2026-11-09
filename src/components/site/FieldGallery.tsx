import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionTitle } from "@/components/site/Layout";
import { useI18n } from "@/lib/i18n";

import handWashing from "@/assets/field-hand-washing.jpg";
import carpetSluice from "@/assets/field-carpet-sluice.jpg";
import barsScale from "@/assets/gold-bars-scale.jpg";
import woodenSluice from "@/assets/field-wooden-sluice.jpg";
import shaftWinch from "@/assets/field-shaft-winch.jpg";

const photos = [handWashing, carpetSluice, barsScale, woodenSluice, shaftWinch];

export function FieldGallery() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || engaged || reducedMotion) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % photos.length), 6000);
    return () => window.clearTimeout(timer);
  }, [active, paused, engaged, reducedMotion]);
  const caption = t.media.photos[active] ?? t.media.title;
  return (
    <Section>
      <SectionTitle eyebrow={t.media.eyebrow} title={t.media.title} />
      <div className="mx-auto max-w-4xl" onMouseEnter={() => setEngaged(true)} onMouseLeave={() => setEngaged(false)} onFocusCapture={() => setEngaged(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setEngaged(false); }}>
        <div className="field-gallery-stage relative overflow-hidden rounded-lg bg-navy-deep">
          <img key={`backdrop-${active}`} src={photos[active]} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl" />
          <div className="absolute inset-0 bg-navy-deep/30" />
          <div key={active} className="field-gallery-slide relative h-full w-full">
            <img src={photos[active]} alt={caption} className="h-full w-full object-contain" loading="lazy" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="min-w-0 text-sm font-medium text-navy" aria-live="polite">{caption}</p>
          <div className="flex shrink-0 gap-1">
            <Button variant="outline" size="icon" title={t.media.previous} aria-label={t.media.previous} onClick={() => setActive((active + photos.length - 1) % photos.length)}><ChevronLeft /></Button>
            <Button variant="outline" size="icon" title={paused ? t.media.play : t.media.pause} aria-label={paused ? t.media.play : t.media.pause} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button>
            <Button variant="outline" size="icon" title={t.media.next} aria-label={t.media.next} onClick={() => setActive((active + 1) % photos.length)}><ChevronRight /></Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5 sm:gap-3">
          {photos.map((url, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`relative h-auto aspect-[4/3] overflow-hidden rounded-lg p-0 ${active === index ? "ring-2 ring-gold ring-offset-2 ring-offset-background" : "opacity-70"}`}
              aria-label={`${t.media.select}: ${t.media.photos[index] ?? ""}`}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <img src={url} alt="" className="h-full w-full object-cover" loading="lazy" />
            </Button>
          ))}
        </div>
      </div>
    </Section>
  );
}
