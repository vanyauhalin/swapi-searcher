import type { EffectCallback } from 'react';
import { useEffect } from 'react';

// Uses `callback`, because react hooks uses `callback`.
// eslint-disable-next-line promise/prefer-await-to-callbacks
function useMount(callback: EffectCallback): void {
  useEffect(callback, []);
}

export {
  useMount,
};
