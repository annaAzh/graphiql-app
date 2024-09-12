import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../../../i18nConfig';
import { Locale } from 'shared/types/path';

export const LanguageChanger = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push(Locale.EN + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <select defaultValue={currentLocale} onChange={handleChange}>
      <option value={Locale.EN}>EN</option>
      <option value={Locale.RU}>RU</option>
    </select>
  );
};
