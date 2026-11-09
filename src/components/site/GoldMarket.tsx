import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Globe2, MapPin, RefreshCw, Coins, Clock3 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { goldMarketOptions } from '@/lib/gold-market-query';
import { goldPerGram } from '@/lib/gold-pricing';
import { Button } from '@/components/ui/button';

export function GoldMarket() {
  const { t, lang } = useI18n();
  const { data, refetch, isFetching } = useSuspenseQuery(goldMarketOptions);
  const [karat, setKarat] = useState(24);
  const locale = lang === 'sw' ? 'sw-TZ' : 'en-TZ';
  const money = (value: number, currency: string) => new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: currency === 'TZS' ? 0 : 2 }).format(value);
  const time = (value: string | number) => new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Dar_es_Salaam' }).format(new Date(value));
  const delayed = data.gold && data.checkedAt - Date.parse(data.gold.updatedAt) > 5 * 60000;

  return (
    <section aria-labelledby="gold-market-title" className="border-b border-gold/30 bg-background py-10 md:py-12">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Coins className="h-4 w-4 text-gold" />{t.market.eyebrow}</p>
            <h2 id="gold-market-title" className="text-3xl font-bold text-navy">{t.market.title}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-muted-foreground">{t.market.purity}</span>
            <div role="group" aria-label={t.market.purity} className="flex gap-1">
              {[24, 22, 18].map(k => <Button key={k} variant={karat === k ? 'gold' : 'outline'} size="sm" aria-pressed={karat === k} onClick={() => setKarat(k)}>{k}K</Button>)}
            </div>
            <Button variant="outline" size="icon" aria-label={t.market.refresh} title={t.market.refresh} disabled={isFetching} onClick={() => void refetch()}><RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin motion-reduce:animate-none' : ''}`} /></Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-lg bg-navy-deep p-6 text-on-navy">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-on-navy/80"><Globe2 className="h-4 w-4 text-gold" />{t.market.global}</h3>
            {data.gold ? <>
              <p className="mt-4 break-words font-display text-3xl font-bold tabular-nums sm:text-4xl">{money(data.gold.price, 'USD')}</p>
              <p className="mt-1 text-xs text-on-navy/65">{t.market.ounce} · 24K</p>
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-t border-on-navy/15 pt-4"><span className="text-xs text-on-navy/70">{karat}K · {t.market.gram}</span><strong className="text-xl text-gold tabular-nums">{money(goldPerGram(data.gold.price, 1, karat), 'USD')}</strong></div>
            </> : <p role="status" className="mt-5 text-sm">{t.market.unavailable}</p>}
          </article>
          <article className="rounded-lg border border-gold/40 bg-accent p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-navy"><MapPin className="h-4 w-4" />{t.market.local}</h3>
            {data.gold && data.fx ? <>
              <p className="mt-4 break-words font-display text-3xl font-bold text-navy tabular-nums sm:text-4xl">{money(goldPerGram(data.gold.price, data.fx.rate, karat), 'TZS')}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.market.gram} · {karat}K</p>
              <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-t border-gold/30 pt-4"><span className="text-xs text-muted-foreground">{t.market.fx}</span><strong className="text-xl text-navy tabular-nums">{new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(data.fx.rate)}</strong></div>
            </> : <p role="status" className="mt-5 text-sm text-muted-foreground">{t.market.unavailable}</p>}
          </article>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground" aria-live="polite">
          {data.gold && <span className={`flex items-center gap-1.5 ${delayed ? 'text-warning' : 'text-success'}`}><Clock3 className="h-3.5 w-3.5" />{delayed ? t.market.stale : t.market.current}</span>}
          {data.gold && <span>{t.market.updated}: {time(data.gold.updatedAt)} EAT</span>}
          {data.fx && <span>{t.market.fxUpdated}: {time(data.fx.updatedAt)} EAT</span>}
        </div>
        <p className="mt-3 max-w-4xl text-xs leading-relaxed text-muted-foreground">{t.market.note}</p>
        <p className="mt-2 text-xs text-muted-foreground">{t.market.sources}: <a href="https://gold-api.com" target="_blank" rel="noreferrer" className="underline underline-offset-2">Gold API</a> · <a href="https://www.exchangerate-api.com" target="_blank" rel="noreferrer" className="underline underline-offset-2">Rates By Exchange Rate API</a></p>
      </div>
    </section>
  );
}