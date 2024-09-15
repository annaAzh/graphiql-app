import { initTranslations } from './i18n';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next);
// .init({
//   lng: 'en',
//   fallbackLng: 'en',
//   ns: ['translationsNS'],
//   defaultNS: 'translationsNS',

//   debug: true,

//   interpolation: {
//     escapeValue: false,
//   },

//   resources: { en: { translationsNS: {} } },
// });

vi.mock('react-i18next', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-i18next')>();
  return {
    ...actual,
    i18n,
  };
});

const mockLocale = '/';

const mockResources = { ru: { ru: '/ru' } };

describe('test initTranslations', () => {
  it('expect received data equal encoded data', async () => {
    const result = await initTranslations(mockLocale);
    expect(result.i18n.resolvedLanguage).toBe('en');
  });

  it('expect received data equal encoded data', async () => {
    const result = await initTranslations(mockLocale, i18n, mockResources);
    expect(result.i18n.language).toBe('/');
  });
});
