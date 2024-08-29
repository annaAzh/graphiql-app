import { ReactNode } from 'react';
import { GraphQlPlayground } from 'widgets/GraphQl';

const GraphQLLayout = ({ children }: { children: ReactNode }) => {
  return <GraphQlPlayground>{children}</GraphQlPlayground>;
};

export default GraphQLLayout;
