import { ReactNode } from 'react';
import { Header } from 'widgets/Header';
import { Footer } from 'widgets/Footer';
import styles from './styles/Main.module.scss';
import 'shared/styles/global.scss';
import { StoreProvider } from 'core';

export const metadata = {
  title: 'Graphiql-app',
  description:
    'Final project at RSS School using Next.js and creating a REST/GraphQL client.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <StoreProvider>
          <main className={styles.main}>{children}</main>
        </StoreProvider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
