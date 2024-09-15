import { createInstance, i18n, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import i18nConfig from '../../../../i18nConfig';
import resourcesToBackend from 'i18next-resources-to-backend';

export async function initTranslations(
  locale: string,
  i18nInstance?: i18n,
  resources?: Resource
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string) =>
          import(`../../../../locales/${language}/default.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
