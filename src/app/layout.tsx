import { ReactNode } from 'react';
import { Header } from 'widgets/Header';
import 'shared/styles/global.scss';

export const metadata = {
  title: 'Graphiql',
  icons: {
    icon: '/favicon.png',
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
