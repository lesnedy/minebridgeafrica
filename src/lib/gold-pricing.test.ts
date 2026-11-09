import { describe, expect, it } from 'vitest';
import { goldPerGram } from './gold-pricing';

describe('Gold market conversions', () => {
  it('converts troy ounces into grams, not ordinary ounces', () => {
    expect(goldPerGram(3110.34768)).toBeCloseTo(100, 6);
  });
  it('converts global spot prices into Tanzanian shillings', () => {
    expect(goldPerGram(3110.34768, 2500)).toBeCloseTo(250000, 6);
  });
  it('adjusts the reference price to the selected purity', () => {
    expect(goldPerGram(3110.34768, 2500, 18)).toBeCloseTo(187500, 6);
    expect(goldPerGram(3110.34768, 2500, 22)).toBeCloseTo(229166.666667, 5);
  });
  it('rejects missing or invalid rates rather than showing invented prices', () => {
    expect(() => goldPerGram(0)).toThrow();
    expect(() => goldPerGram(3000, NaN)).toThrow();
    expect(() => goldPerGram(3000, 2500, 25)).toThrow();
  });
});