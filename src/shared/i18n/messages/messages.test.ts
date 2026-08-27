import { describe, expect, it } from 'vitest';
import { en, vi } from '.';

describe('message catalogs', () => {
  it('provides every English key in Vietnamese', () => {
    expect(Object.keys(vi).sort()).toEqual(Object.keys(en).sort());
  });
});
