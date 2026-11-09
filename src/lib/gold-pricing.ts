export const GRAMS_PER_TROY_OUNCE = 31.1034768;

export function goldPerGram(usdPerOunce: number, exchangeRate = 1, karat = 24) {
  if (!Number.isFinite(usdPerOunce) || usdPerOunce <= 0 || !Number.isFinite(exchangeRate) || exchangeRate <= 0 || !Number.isFinite(karat) || karat <= 0 || karat > 24) {
    throw new Error('Invalid gold pricing input');
  }
  return (usdPerOunce / GRAMS_PER_TROY_OUNCE) * exchangeRate * (karat / 24);
}