import { use } from '@astro-tools:i18n';

export async function useTranslations(
  locale: string,
  fallbackLocale?: string,
): Promise<void> {
  await use({
    locale,
    fallbackLocale: fallbackLocale || 'en-US',
  });
}
