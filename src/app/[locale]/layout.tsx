import { ReactNode } from 'react';
import { Header } from 'widgets/Header';
import { Footer } from 'widgets/Footer';
import styles from './styles/Main.module.scss';
import 'shared/styles/global.scss';
import { initTranslations, StoreProvider, TranslationsProvider } from 'core';
import { rubik } from 'shared/styles/fonts/fonts';
import i18nConfig from '../../../i18nConfig';
import { dir } from 'i18next';

export const metadata = {
  title: 'Graphiql-app',
  description:
    'Final project at RSS School using Next.js and creating a REST/GraphQL client.',
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const RootLayout = async ({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  const { resources } = await initTranslations(locale);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={rubik.className}>
        <TranslationsProvider locale={locale} resources={resources}>
          <Header />
          <StoreProvider>
            <main className={styles.main}>{children}</main>
          </StoreProvider>
          <Footer />
        </TranslationsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
