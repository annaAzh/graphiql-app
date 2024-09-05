import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Path } from 'shared/types/path';
import { GraphQlPlayground } from 'widgets/GraphQl';

const GraphQLLayout = ({ children }: { children: ReactNode }) => {
  const cookie = cookies();
  const user = cookie.get('user');

  if (!user) redirect(Path.MAIN);

  return <GraphQlPlayground>{children}</GraphQlPlayground>;
};

export default GraphQLLayout;
