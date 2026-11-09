import { useI18n, type MiningStageId } from "@/lib/i18n";

import washPlant from "@/assets/field-wash-plant.jpg";
import carpetSluice from "@/assets/field-carpet-sluice.jpg";
import handPanning from "@/assets/field-hand-panning.jpg";
import openPit from "@/assets/field-open-pit.jpg";
import oreBagging from "@/assets/field-ore-bagging.jpg";
import excavatorPump from "@/assets/field-excavator-pump.jpg";
import handWashing from "@/assets/field-hand-washing.jpg";
import woodenSluice from "@/assets/field-wooden-sluice.jpg";
import shaftWinch from "@/assets/field-shaft-winch.jpg";
import geologyProfile from "@/assets/gold-geology-profile.jpg";
import smelting from "@/assets/gold-smelting.jpg";
import bullionBars from "@/assets/gold-bullion-bars.jpg";
import barsScale from "@/assets/gold-bars-scale.jpg";
import goldNuggets from "@/assets/gold-nuggets-hand.jpg";
import concentrateCollage from "@/assets/field-concentrate-collage.jpg";

const stageImages: Record<MiningStageId, string> = {
  geology: geologyProfile,
  openpit: openPit,
  extraction: excavatorPump,
  shaft: shaftWinch,
  bagging: oreBagging,
  washing: washPlant,
  handwashing: handWashing,
  sluicing: carpetSluice,
  smallsluice: woodenSluice,
  panning: handPanning,
  smelting: smelting,
  bullion: bullionBars,
  weighing: barsScale,
  nuggets: goldNuggets,
  collage: concentrateCollage,
};

/**
 * Bilingual, captioned photo set. Pages pass only the stage ids that match
 * the activity described on that page, so the same shared media stays honest.
 */
export function ProcessGallery({ ids, columns = 3 }: { ids: MiningStageId[]; columns?: 2 | 3 }) {
  const { t } = useI18n();
  const gridClass = columns === 2 ? "grid gap-6 sm:grid-cols-2" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";
  const featureSpan = columns === 2 ? "sm:col-span-2" : "sm:col-span-2 lg:col-span-3";
  return (
    <div className={gridClass}>
      {ids.map((id, index) => {
        const [title = "", text = ""] = t.process.items[id] ?? [];
        const number = String(index + 1).padStart(2, "0");

        if (id === "geology") {
          return (
            <figure key={id} className={`overflow-hidden rounded-2xl border bg-card shadow-sm ${featureSpan}`}>
              <div className="grid md:grid-cols-2">
                <div className="grid place-items-center bg-white p-4">
                  <img
                    src={stageImages[id]}
                    alt={title}
                    loading="lazy"
                    className="max-h-[520px] w-full object-contain"
                  />
                </div>
                <figcaption className="flex flex-col justify-center p-6 md:p-10">
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">{number}</span>
                  <h3 className="mt-2 text-xl font-bold text-navy">{title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
                </figcaption>
              </div>
            </figure>
          );
        }

        return (
          <figure key={id} className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-elegant">
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={stageImages[id]}
                alt={title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <figcaption className="p-6">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">{number}</span>
              <h3 className="mt-2 font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
