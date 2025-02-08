import { getI18nState } from '../state/translations.ts';

export function locale(): string {
  return getI18nState().locale;
}
