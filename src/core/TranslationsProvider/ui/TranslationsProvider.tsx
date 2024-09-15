'use client';
import { I18nextProvider } from 'react-i18next';
import { createInstance, Resource } from 'i18next';
import { initTranslations } from '../config/i18n';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  locale: string;
  resources: Resource;
}

export function TranslationsProvider({ children, locale, resources }: Props) {
  const i18n = createInstance();

  initTranslations(locale, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
