import { FC } from 'react';

type Props = {
  params: { graphReq: [string, string] };
  searchParams?: { [key: string]: string };
};

const GraphQlPage: FC<Props> = async ({ params, searchParams }) => {
  try {
    const { graphReq } = params;
    console.log(searchParams, 'searchParams', graphReq, 'graphReq');
  } catch {
    return <>Error</>;
  }
};

export default GraphQlPage;
