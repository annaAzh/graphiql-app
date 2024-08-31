import { ReactNode } from 'react';
import { Header } from 'widgets/Header';
import { Footer } from 'widgets/Footer';
import 'shared/styles/global.scss';

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
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
