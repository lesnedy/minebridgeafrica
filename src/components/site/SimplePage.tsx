import { CheckCircle2, Clock, FileCheck2, FileClock, FileText, Landmark, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT, whatsappLink, mailLink } from "@/lib/contact";
import { news, opportunities, professionals } from "@/lib/data";
import { PageHero, Section, SectionTitle, DisclaimerBox } from "@/components/site/Layout";
import { OpportunityCard } from "@/components/site/OpportunityCard";
import { EnquiryForm, type Field } from "@/components/site/EnquiryForm";
import { Button } from "@/components/ui/button";
import { FieldGallery } from "@/components/site/FieldGallery";
import { ProcessGallery } from "@/components/site/ProcessGallery";
import { PublishedNews } from "@/components/site/PublishedNews";
import { Suspense } from "react";

import heroImg from "@/assets/hero-mine.jpg";
import goldImg from "@/assets/gold-ore.jpg";
import prosImg from "@/assets/professionals.jpg";
import invImg from "@/assets/investors.jpg";

export type PageKey = "about" | "services" | "opportunities" | "investors" | "miners" | "news" | "directory" | "contact" | "legal";

function Card({ icon, title, text }: { icon: React.ReactNode; title: string; text?: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-elegant">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-gold text-gold-foreground shadow-gold">{icon}</span>
      <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
      {text && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow="MineBridge Africa" title={t.about.title} sub={t.about.sub} image={heroImg} />
      <Section>
        <SectionTitle eyebrow="MineBridge Africa" title={t.about.storyTitle} />
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{t.about.story}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-gold text-gold-foreground shadow-gold"><Sparkles className="h-5 w-5" /></span>
            <h3 className="mt-4 text-xl font-bold text-navy">{t.about.vision}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t.about.visionText}</p>
          </div>
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-gold text-gold-foreground shadow-gold"><Landmark className="h-5 w-5" /></span>
            <h3 className="mt-4 text-xl font-bold text-navy">{t.about.mission}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t.about.missionText}</p>
          </div>
        </div>
      </Section>
      <Section className="bg-secondary/50">
        <SectionTitle title={t.about.valuesTitle} center />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.values.map((v) => <Card key={v[0]!} icon={<ShieldCheck className="h-5 w-5" />} title={v[0]!} text={v[1]!} />)}
        </div>
        <div className="mt-12"><DisclaimerBox /></div>
      </Section>
    </>
  );
}

function ServicesPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow={t.nav.services} title={t.services.title} sub={t.services.sub} image={goldImg} />
      <Section>
        <SectionTitle title={t.services.listTitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.list.map((s, i) => (
            <Card key={s[0]!} icon={<span className="font-display text-lg font-bold">{String(i + 1).padStart(2, "0")}</span>} title={s[0]!} text={s[1]!} />
          ))}
        </div>
      </Section>
      <Section className="bg-secondary/50">
        <SectionTitle eyebrow={t.process.eyebrow} title={t.process.title} sub={t.process.sub} />
        <ProcessGallery ids={["geology", "extraction", "bagging", "washing", "sluicing", "smallsluice", "panning", "smelting"]} />
        <p className="mt-8 text-sm text-muted-foreground">{t.process.note}</p>
      </Section>
      <Section className="bg-gradient-navy text-center text-on-navy">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">{t.home.finalTitle}</h2>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold" size="lg" className="rounded-full"><a href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle />{CONTACT.phoneDisplay}</a></Button>
          <Button asChild variant="glass" size="lg" className="rounded-full"><a href={mailLink()}><Mail />{CONTACT.email}</a></Button>
        </div>
      </Section>
    </>
  );
}

function OpportunitiesPage() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow={t.nav.opportunities} title={t.opps.title} sub={t.opps.sub} image={heroImg} />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o) => <OpportunityCard key={o.id} o={o} detailed />)}
        </div>
        <div className="mt-12"><DisclaimerBox /></div>
      </Section>
    </>
  );
}

function InvestorsPage() {
  const { t } = useI18n();
  const fields: Field[] = [
    { key: "name", label: t.form.name },
    { key: "company", label: t.form.company },
    { key: "phone", label: t.form.phone, type: "tel" },
    { key: "email", label: t.form.email, type: "email" },
    { key: "country", label: t.form.country },
    { key: "interest", label: t.form.interest },
    { key: "budget", label: t.form.budget, type: "select", options: ["< $50,000", "$50,000 – $250,000", "$250,000 – $1,000,000", "> $1,000,000"] },
    { key: "message", label: t.form.message, type: "textarea" },
  ];
  return (
    <>
      <PageHero eyebrow={t.nav.investors} title={t.investors.title} sub={t.investors.sub} image={invImg} />
      <Section>
        <SectionTitle title={t.investors.processTitle} center />
        <ol className="mx-auto grid max-w-3xl gap-4">
          {t.investors.process.map((step, i) => (
            <li key={step} className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-gold font-display font-bold text-gold-foreground shadow-gold">{i + 1}</span>
              <span className="font-medium text-navy">{step}</span>
            </li>
          ))}
        </ol>
        <div className="mt-16">
          <SectionTitle eyebrow={t.process.goldEyebrow} title={t.process.goldTitle} sub={t.process.goldSub} />
          <ProcessGallery ids={["bullion", "weighing", "nuggets", "collage"]} columns={2} />
        </div>
      </Section>
      <Section className="bg-secondary/50">
        <EnquiryForm title={t.investors.formTitle} fields={fields} subject="Investor Enquiry — MineBridge Africa" />
        <div className="mt-12"><DisclaimerBox /></div>
      </Section>
    </>
  );
}

function MinersPage() {
  const { t } = useI18n();
  const fields: Field[] = [
    { key: "name", label: t.form.name },
    { key: "company", label: t.form.company },
    { key: "phone", label: t.form.phone, type: "tel" },
    { key: "email", label: t.form.email, type: "email" },
    { key: "region", label: t.form.region },
    { key: "mineral", label: t.form.mineral },
    { key: "description", label: t.form.description, type: "textarea" },
  ];
  return (
    <>
      <PageHero eyebrow={t.nav.miners} title={t.miners.title} sub={t.miners.sub} image={goldImg} />
      <Section>
        <SectionTitle title={t.miners.benefitsTitle} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.miners.benefits.map((b) => (
            <div key={b} className="flex items-center gap-3 rounded-2xl border bg-card p-5 shadow-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-whatsapp" /><span className="text-sm font-medium text-navy">{b}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionTitle eyebrow={t.process.fieldEyebrow} title={t.process.fieldTitle} sub={t.process.fieldSub} />
        <ProcessGallery ids={["openpit", "shaft", "bagging", "handwashing"]} columns={2} />
        <p className="mt-8 text-sm text-muted-foreground">{t.process.note}</p>
      </Section>
      <Section className="bg-secondary/50">
        <EnquiryForm title={t.miners.formTitle} fields={fields} subject="Mining Project Submission — MineBridge Africa" />
        <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground"><FileText className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{t.miners.docNote}</p>
        <div className="mt-12"><DisclaimerBox /></div>
      </Section>
    </>
  );
}

function NewsPage() {
  const { t, lang } = useI18n();
  const featured = news[0]!;
  const rest = news.slice(1);
  return (
    <>
      <PageHero eyebrow={t.nav.news} title={t.news.title} sub={t.news.sub} image={prosImg} />
      <FieldGallery />
      <Suspense fallback={null}><PublishedNews /></Suspense>
      <Section>
        <p className="mb-6 text-sm text-muted-foreground">{t.common.exampleContent}</p>
        <article className="grid overflow-hidden rounded-2xl border bg-card shadow-elegant md:grid-cols-2">
          <img src={featured.image} alt={featured.title[lang]} className="h-full w-full object-cover" />
          <div className="flex flex-col justify-center p-8 md:p-10">
            <span className="inline-flex w-fit rounded-full bg-gradient-gold px-3 py-1 text-[11px] font-semibold text-gold-foreground">{t.news.featured}</span>
            <h2 className="mt-4 text-2xl font-bold text-navy md:text-3xl">{featured.title[lang]}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{featured.excerpt[lang]}</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">{featured.cat[lang]} · {new Date(featured.date).toLocaleDateString(lang === "sw" ? "sw-KE" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          </div>
        </article>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {rest.map((n) => (
            <article key={n.id} className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-elegant">
              <img src={n.image} alt={n.title[lang]} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-widest text-gold">{n.cat[lang]}</p>
                <h3 className="mt-2 font-bold leading-snug text-navy">{n.title[lang]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.excerpt[lang]}</p>
                <p className="mt-4 text-xs text-muted-foreground">{new Date(n.date).toLocaleDateString(lang === "sw" ? "sw-KE" : "en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section className="bg-gradient-navy text-center text-on-navy">
        <h2 className="text-2xl font-bold md:text-3xl">{t.news.newsletter}</h2>
        <p className="mx-auto mt-3 max-w-xl text-on-navy/75">{t.news.newsletterSub}</p>
        <Button asChild variant="gold" size="lg" className="mt-8 rounded-full">
          <a href={mailLink(t.news.newsletter)}><Mail />{t.news.subscribe}</a>
        </Button>
      </Section>
    </>
  );
}

function DirectoryPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHero eyebrow={t.nav.directory} title={t.directory.title} sub={t.directory.sub} image={invImg} />
      <Section>
        <p className="mb-6 text-sm text-muted-foreground">{t.common.exampleContent}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {professionals.map((p) => (
            <article key={p.name} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-elegant">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold text-navy">{p.name}</h3>
                <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${p.verified ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                  {p.verified ? <ShieldCheck className="h-3 w-3" /> : <FileClock className="h-3 w-3" />}{p.verified ? t.directory.verified : t.directory.pending}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-gold"><MapPin className="h-3.5 w-3.5" />{p.location}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.cat[lang]}</p>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.desc[lang]}</p>
              <Button asChild variant="outline" size="sm" className="mt-4 self-start rounded-full">
                <a href={whatsappLink(`${t.directory.join}: ${p.name}`)} target="_blank" rel="noreferrer">{t.directory.join}</a>
              </Button>
            </article>
          ))}
        </div>
        <div className="mt-12"><DisclaimerBox /></div>
      </Section>
    </>
  );
}

function ContactPage() {
  const { t } = useI18n();
  const fields: Field[] = [
    { key: "name", label: t.form.name },
    { key: "phone", label: t.form.phone, type: "tel" },
    { key: "email", label: t.form.email, type: "email" },
    { key: "enquiry", label: t.form.enquiry, type: "select", options: [...t.contact.enquiryTypes] },
    { key: "message", label: t.form.message, type: "textarea" },
  ];
  const info: { icon: React.ReactNode; label: string; value: string; href?: string }[] = [
    { icon: <MapPin className="h-5 w-5" />, label: t.contact.office, value: CONTACT.pobox },
    { icon: <MessageCircle className="h-5 w-5" />, label: t.contact.phone, value: CONTACT.phoneDisplay, href: whatsappLink() },
    { icon: <Mail className="h-5 w-5" />, label: t.contact.email, value: CONTACT.email, href: mailLink() },
    { icon: <Clock className="h-5 w-5" />, label: t.contact.hours, value: t.contact.hours },
  ];
  return (
    <>
      <PageHero eyebrow={t.nav.contact} title={t.contact.title} sub={t.contact.sub} image={heroImg} />
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {info.map((c) => {
            const inner = (
              <>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-gold text-gold-foreground shadow-gold">{c.icon}</span>
                <h3 className="mt-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{c.label}</h3>
                <p className="mt-1 font-medium text-navy">{c.value}</p>
              </>
            );
            return c.href ? (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-elegant">{inner}</a>
            ) : (
              <div key={c.label} className="rounded-2xl border bg-card p-6 shadow-sm">{inner}</div>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">{t.contact.tapHint}</p>
      </Section>
      <Section className="bg-secondary/50">
        <EnquiryForm title={t.contact.formTitle} fields={fields} subject="Website Enquiry — MineBridge Africa" />
        <div className="mt-12"><DisclaimerBox /></div>
      </Section>
    </>
  );
}

function LegalPage() {
  const { t } = useI18n();
  const sections: { title: string; text: string; icon: React.ReactNode }[] = [
    { title: t.legal.privacy, text: t.legal.texts.privacy, icon: <ShieldCheck className="h-5 w-5" /> },
    { title: t.legal.terms, text: t.legal.texts.terms, icon: <FileText className="h-5 w-5" /> },
    { title: t.legal.verification, text: t.legal.texts.verification, icon: <FileCheck2 className="h-5 w-5" /> },
    { title: t.legal.risk, text: t.legal.texts.risk, icon: <FileClock className="h-5 w-5" /> },
    { title: t.legal.data, text: t.legal.texts.data, icon: <Mail className="h-5 w-5" /> },
  ];
  return (
    <>
      <PageHero eyebrow="MineBridge Africa" title={t.legal.title} sub={t.disclaimer} image={prosImg} />
      <Section>
        <div className="mx-auto grid max-w-3xl gap-6">
          {sections.map((s) => (
            <div key={s.title} className="rounded-2xl border bg-card p-7 shadow-sm">
              <h2 className="flex items-center gap-3 text-lg font-bold text-navy"><span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-gold text-gold-foreground">{s.icon}</span>{s.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
          <div className="rounded-2xl border bg-card p-7 shadow-sm">
            <h2 className="flex items-center gap-3 text-lg font-bold text-navy"><span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-gold text-gold-foreground"><Phone className="h-5 w-5" /></span>{t.legal.disclaimer}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t.disclaimer}</p>
          </div>
        </div>
      </Section>
    </>
  );
}

export function SimplePage({ page }: { page: PageKey }) {
  switch (page) {
    case "about": return <AboutPage />;
    case "services": return <ServicesPage />;
    case "opportunities": return <OpportunitiesPage />;
    case "investors": return <InvestorsPage />;
    case "miners": return <MinersPage />;
    case "news": return <NewsPage />;
    case "directory": return <DirectoryPage />;
    case "contact": return <ContactPage />;
    case "legal": return <LegalPage />;
  }
}
