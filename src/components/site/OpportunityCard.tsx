import { MapPin, Gem, Layers, Handshake, FileText, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { opportunities, Status } from "@/lib/data";
import { whatsappLink } from "@/lib/contact";
import { Button } from "@/components/ui/button";

export function StatusBadge({ status }: { status: Status }) {
  const { t } = useI18n();
  const cls = status === "verified" ? "bg-success text-on-navy" : status === "review" ? "bg-warning text-gold-foreground" : "bg-muted text-muted-foreground";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${cls}`}>{t.status[status]}</span>;
}

export function OpportunityCard({ o, detailed = false }: { o: (typeof opportunities)[number]; detailed?: boolean }) {
  const { t, lang } = useI18n();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-elegant">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={o.image} alt={o.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute left-3 top-3"><StatusBadge status={o.status} /></div>
        <span className="absolute bottom-3 right-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">{o.mineral}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-navy">{o.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{o.region}, {o.country}</p>
        {detailed && <p className="mt-3 text-sm text-foreground/80">{o.desc[lang]}</p>}
        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex items-center gap-2"><Layers className="h-4 w-4 text-gold" /><dt className="text-muted-foreground">{t.common.stage}:</dt><dd className="font-medium">{o.stage[lang]}</dd></div>
          <div className="flex items-center gap-2"><Handshake className="h-4 w-4 text-gold" /><dt className="text-muted-foreground">{t.common.type}:</dt><dd className="font-medium">{o.type[lang]}</dd></div>
          {detailed && <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-gold" /><dt className="text-muted-foreground">{t.common.docs}:</dt><dd className="font-medium">{o.docs[lang]}</dd></div>}
          {!detailed && <div className="flex items-center gap-2"><Gem className="h-4 w-4 text-gold" /><dt className="text-muted-foreground">{t.common.mineral}:</dt><dd className="font-medium">{o.mineral}</dd></div>}
        </dl>
        <p className="mt-4 text-[11px] italic text-muted-foreground">{t.common.sampleNote}</p>
        {detailed && (
          <Button asChild variant="gold" className="mt-4 rounded-full">
            <a href={whatsappLink(`${t.common.interest}: ${o.name} (${o.region})`)} target="_blank" rel="noreferrer"><MessageCircle />{t.common.interest}</a>
          </Button>
        )}
      </div>
    </article>
  );
}
