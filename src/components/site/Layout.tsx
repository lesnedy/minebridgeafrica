import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Phone, Mail, MapPin, MessageCircle, Globe, Facebook, Instagram, Linkedin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT, whatsappLink, mailLink } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import { ThemeSwitch } from "./ThemeSwitch";
import companyLogo from "@/assets/company-logo.asset.json";

export function Logo({ light = false }: { light?: boolean }) {
  const { t } = useI18n();
  return (
    <Link to="/" aria-label={t.brand.name} className={`block shrink-0 overflow-hidden ${light ? "rounded-md bg-white p-2" : ""}`}>
      <img
        src={light ? companyLogo.url : companyLogo.header_url}
        alt={t.brand.logo}
        className={light ? "h-auto w-52 object-contain" : "h-14 w-auto max-w-[190px] object-contain"}
      />
    </Link>
  );
}

export function LangSwitch({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`flex items-center rounded-full border p-0.5 text-xs font-semibold ${light ? "border-on-navy/30" : "border-border"}`}>
      <Globe className={`mx-1.5 h-3.5 w-3.5 ${light ? "text-on-navy/70" : "text-muted-foreground"}`} />
      {(["en", "sw"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 transition ${lang === l ? "bg-gradient-gold text-gold-foreground" : light ? "text-on-navy/80" : "text-muted-foreground"}`}>
          {l === "en" ? "EN" : "SW"}
        </button>
      ))}
    </div>
  );
}

const navKeys = [
  ["/", "home"], ["/about", "about"], ["/services", "services"], ["/opportunities", "opportunities"],
  ["/investors", "investors"], ["/miners", "miners"], ["/news", "news"], ["/directory", "directory"], ["/contact", "contact"],
] as const;

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy-deep text-on-navy/80 md:block">
        <div className="container-site flex h-9 items-center justify-between text-xs">
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-gold" />{CONTACT.pobox}</span>
          <div className="flex items-center gap-5">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-gold"><MessageCircle className="h-3.5 w-3.5 text-gold" />{CONTACT.phoneDisplay}</a>
            <a href={mailLink()} className="flex items-center gap-1.5 hover:text-gold"><Mail className="h-3.5 w-3.5 text-gold" />{CONTACT.email}</a>
          </div>
        </div>
      </div>
      <div className="border-b border-border/60 bg-background/90 backdrop-blur-lg">
        <div className="container-site flex h-16 items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-1 xl:flex">
            {navKeys.slice(1).map(([to, k]) => (
              <Link key={to} to={to} className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground/75 transition hover:text-navy"
                activeProps={{ className: "text-navy font-semibold" }}>{t.nav[k]}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><LangSwitch /></div>
            <ThemeSwitch />
            <Button asChild variant="ghost" size="icon" aria-label={t.admin.login} title={t.admin.login}><Link to="/admin"><UserRound /></Link></Button>
            <Button asChild variant="gold" className="hidden rounded-full lg:inline-flex"><Link to="/opportunities">{t.nav.cta}</Link></Button>
            <button className="grid h-10 w-10 place-items-center rounded-md border xl:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t bg-background xl:hidden">
            <nav className="container-site grid gap-1 py-4">
              {navKeys.map(([to, k]) => (
                <Link key={to} to={to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 font-medium hover:bg-muted"
                  activeProps={{ className: "bg-accent text-navy" }} activeOptions={{ exact: to === "/" }}>{t.nav[k]}</Link>
              ))}
              <div className="mt-3 flex items-center justify-between gap-3">
                <LangSwitch />
                <Button asChild variant="gold" className="rounded-full"><Link to="/opportunities" onClick={() => setOpen(false)}>{t.nav.cta}</Link></Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  const col = (title: string, links: [string, string][]) => (
    <div>
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map(([to, label]) => <li key={label}><Link to={to} className="text-on-navy/70 hover:text-gold">{label}</Link></li>)}
      </ul>
    </div>
  );
  return (
    <footer className="bg-gradient-navy text-on-navy">
      <div className="container-site grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm font-display text-lg text-on-navy/90">{t.slogan}</p>
          <ul className="mt-6 space-y-3 text-sm text-on-navy/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" />{CONTACT.pobox}</li>
            <li><a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex gap-2 hover:text-gold"><Phone className="h-4 w-4 text-gold" />{CONTACT.phoneDisplay} (WhatsApp)</a></li>
            <li><a href={mailLink()} className="flex gap-2 hover:text-gold"><Mail className="h-4 w-4 text-gold" />{CONTACT.email}</a></li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((I, i) => (
              <span key={i} className="grid h-9 w-9 place-items-center rounded-full border border-on-navy/20 text-on-navy/70"><I className="h-4 w-4" /></span>
            ))}
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-whatsapp text-on-navy"><MessageCircle className="h-4 w-4" /></a>
          </div>
        </div>
        {col(t.footer.company, [["/about", t.nav.about], ["/services", t.nav.services], ["/contact", t.nav.contact]])}
        {col(t.footer.opportunities, [["/opportunities", t.nav.opportunities], ["/investors", t.nav.investors], ["/miners", t.nav.miners]])}
        {col(t.footer.resources, [["/news", t.nav.news], ["/directory", t.nav.directory]])}
        {col(t.footer.legal, [["/legal", t.legal.privacy], ["/legal", t.legal.terms], ["/legal", t.legal.disclaimer], ["/legal", t.legal.verification]])}
      </div>
      <div className="border-t border-on-navy/10">
        <div className="container-site py-6 text-xs leading-relaxed text-on-navy/55">
          <p>{t.disclaimer}</p>
          <p className="mt-3">© {new Date().getFullYear()} MineBridge Africa · {CONTACT.city}. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a href={whatsappLink("Hello MineBridge Africa")} target="_blank" rel="noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-on-navy shadow-elegant transition hover:scale-110">
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function PageHero({ title, sub, image, eyebrow }: { title: string; sub: string; image: string; eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="container-site relative py-20 md:py-28">
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>}
        <h1 className="max-w-3xl animate-rise text-4xl font-bold text-on-navy md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl animate-rise text-lg text-on-navy/80">{sub}</p>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, sub, center = false }: { eyebrow?: string; title: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>}
      <h2 className="text-3xl font-bold text-navy md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function DisclaimerBox() {
  const { t } = useI18n();
  return <div className="rounded-xl border border-gold/40 bg-accent p-5 text-sm leading-relaxed text-accent-foreground"><strong className="text-navy">{t.legal.disclaimer}: </strong>{t.disclaimer}</div>;
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`py-20 md:py-24 ${className}`}><div className="container-site">{children}</div></section>;
}
