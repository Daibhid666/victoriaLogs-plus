import { createContext, FC, useState, useCallback } from "preact/compat";
import en, { TranslationKeys } from "./locales/en";
import zh from "./locales/zh";
import { getFromStorage, saveToStorage } from "../utils/storage";

export type Locale = "en" | "zh";

const translations: Record<Locale, Record<TranslationKeys, string>> = { en, zh };

const getInitialLocale = (): Locale => {
  const stored = getFromStorage("LOCALE") as string | undefined;
  if (stored === "en" || stored === "zh") return stored;
  return "en";
};

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKeys, params?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => undefined,
  t: (key) => key,
});

interface Props {
  children: preact.ComponentChildren;
}

export const I18nProvider: FC<Props> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    saveToStorage("LOCALE", newLocale);
  }, []);

  const t = useCallback((key: TranslationKeys, params?: Record<string, string | number>): string => {
    let text = translations[locale]?.[key] || translations.en[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};
