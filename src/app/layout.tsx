import { ReactNode } from 'react';
import 'shared/styles/global.scss';

export const metadata = {
  title: 'Graphiql-app',
  description:
    'Final project at RSS School using Next.js and creating a REST/GraphQL client.',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
