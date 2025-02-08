import { getI18nState } from '../state/translations.ts';

export function fallbackLocale(): string {
  return getI18nState().fallbackLocale;
}
