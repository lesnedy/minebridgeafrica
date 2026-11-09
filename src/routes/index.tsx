import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/lib/contact";
import { PageHero, Section, SectionTitle } from "@/components/site/Layout";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import { opportunities } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { GoldMarket } from "@/components/site/GoldMarket";
import { FieldGallery } from "@/components/site/FieldGallery";
import { ProcessGallery } from "@/components/site/ProcessGallery";
import { goldMarketOptions } from "@/lib/gold-market-query";

import { CheckCircle2, Handshake, MapPin, MessageCircle } from "lucide-react";

import heroImg from "@/assets/hero-mine.jpg";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: "MineBridge Africa — Tanzania Mining & Gold Prices" },
    { name: "description", content: "MineBridge Africa connects miners and investors from Chunya, Mbeya, Tanzania. View worldwide gold prices and Tanzanian shilling reference prices." },
    { property: "og:title", content: "MineBridge Africa — Tanzania Mining & Gold Prices" },
    { property: "og:description", content: "Mining connections from Chunya, Mbeya with worldwide gold prices and Tanzania reference prices, in English and Kiswahili." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: "https://minebridgeafrica.lovable.app/" },
  ], links: [{ rel: "canonical", href: "https://minebridgeafrica.lovable.app/" }] }),
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(goldMarketOptions); },
  component: Index,
});

function Index() {
  const { t } = useI18n();
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep">
          <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="container-site relative flex flex-col items-center justify-center py-14 text-center md:py-20">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">
              <MapPin className="h-3.5 w-3.5" />{t.home.badge}
            </span>
            <h1 className="max-w-4xl animate-rise text-4xl font-bold leading-tight text-on-navy md:text-6xl">{t.brand.name}</h1>
            <p className="mt-4 max-w-3xl text-xl font-semibold text-gold md:text-2xl">{t.home.title}</p>
            <p className="mt-6 max-w-2xl animate-rise text-lg text-on-navy/85">{t.home.sub}</p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg" className="rounded-full"><Link to="/opportunities">{t.home.btn1}</Link></Button>
              <Button asChild variant="glass" size="lg" className="rounded-full"><Link to="/investors">{t.home.btn2}</Link></Button>
              <Button asChild variant="whatsapp" size="lg" className="rounded-full"><a href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle />{t.home.btn3}</a></Button>
            </div>
          </div>
        </section>
        <GoldMarket />
        <FieldGallery />

        {/* Mining process */}
        <Section className="bg-secondary/50">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow={t.process.eyebrow} title={t.process.title} sub={t.process.sub} />
            <Button asChild variant="outline" className="rounded-full"><Link to="/services">{t.common.learnMore}</Link></Button>
          </div>
          <ProcessGallery ids={["openpit", "washing", "panning", "smelting"]} columns={2} />
          <p className="mt-8 text-sm text-muted-foreground">{t.process.note}</p>
        </Section>

        {/* Stats */}
        <section className="bg-gradient-navy">
          <div className="container-site grid grid-cols-2 gap-6 py-12 text-center md:grid-cols-4">
            {t.home.stats.map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-gold md:text-4xl">{num}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-on-navy/70">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Intro + pillars */}
        <Section>
          <SectionTitle eyebrow={t.home.badge} title={t.home.introTitle} sub={t.home.introText} center />
          <div className="flex flex-wrap justify-center gap-3">
            {t.home.pillars.map((p) => (
              <span key={p} className="rounded-full border bg-card px-4 py-2 text-sm font-medium text-navy shadow-sm">{p}</span>
            ))}
          </div>
        </Section>

        {/* How it works */}
        <Section className="bg-secondary/50">
          <SectionTitle title={t.home.howTitle} center />
          <div className="grid gap-6 md:grid-cols-4">
            {t.home.steps.map(([title, text], i) => (
              <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold font-display font-bold text-gold-foreground shadow-gold">{i + 1}</span>
                <h3 className="mt-4 font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Featured opportunities */}
        <Section>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionTitle title={t.home.featuredTitle} />
            <Button asChild variant="outline" className="rounded-full"><Link to="/opportunities">{t.common.viewAll}</Link></Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.slice(0, 3).map((o) => <OpportunityCard key={o.id} o={o} />)}
          </div>
        </Section>

        {/* Who we serve */}
        <Section className="bg-secondary/50">
          <SectionTitle title={t.home.serveTitle} center />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.home.serve.map(([title, text]) => (
              <div key={title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="flex items-center gap-2 font-bold text-navy"><Handshake className="h-4 w-4 text-gold" />{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Trust */}
        <Section>
          <SectionTitle title={t.home.trustTitle} center />
          <div className="flex flex-wrap justify-center gap-3">
            {t.home.trust.map((v) => (
              <span key={v} className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                <CheckCircle2 className="h-4 w-4 text-success" />{v}
              </span>
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <Section className="bg-gradient-navy text-center text-on-navy">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">{t.home.finalTitle}</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg" className="rounded-full"><Link to="/miners">{t.home.finalBtn1}</Link></Button>
            <Button asChild variant="glass" size="lg" className="rounded-full"><Link to="/contact">{t.home.finalBtn2}</Link></Button>
          </div>
        </Section>
      </main>
    </>
  );
}
