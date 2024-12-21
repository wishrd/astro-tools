export interface I18n {
  locale: string;
  fallbackLocale: string;
  translations: Record<string, string>;
}
