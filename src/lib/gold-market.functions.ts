import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const goldSchema = z.object({ price: z.number().positive(), updatedAt: z.string().datetime() });
const fxSchema = z.object({ result: z.literal('success'), time_last_update_unix: z.number().positive(), rates: z.object({ TZS: z.number().positive() }) });
let cachedGold: z.infer<typeof goldSchema> | undefined;
let goldFetchedAt = 0;
let cachedFx: z.infer<typeof fxSchema> | undefined;
let fxFetchedAt = 0;

export const getGoldMarket = createServerFn({ method: 'GET' }).handler(async () => {
  const checkedAt = Date.now();
  const read = async (url: string) => {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      const body = await response.text();
      console.error(`Market source failed [${response.status}]: ${body}`);
      throw new Error('Market source unavailable');
    }
    return response.json();
  };
  const [gold, fx] = await Promise.allSettled([
    (async () => {
      if (cachedGold && checkedAt - goldFetchedAt < 30000) return cachedGold;
      const quote = goldSchema.parse(await read('https://api.gold-api.com/price/XAU'));
      cachedGold = quote;
      goldFetchedAt = checkedAt;
      return quote;
    })(),
    (async () => {
      if (cachedFx && checkedAt - fxFetchedAt < 3600000) return cachedFx;
      const rate = fxSchema.parse(await read('https://open.er-api.com/v6/latest/USD'));
      cachedFx = rate;
      fxFetchedAt = checkedAt;
      return rate;
    })(),
  ]);
  // Do not manufacture prices or present failed refreshes as current quotes.
  return {
    gold: gold.status === 'fulfilled' ? gold.value : null,
    fx: fx.status === 'fulfilled' ? { rate: fx.value.rates.TZS, updatedAt: fx.value.time_last_update_unix * 1000 } : null,
    checkedAt,
  };
});