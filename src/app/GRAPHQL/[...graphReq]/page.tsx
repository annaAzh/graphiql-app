import { FC } from 'react';
import { fetchGraphQlData } from 'shared/lib/api';
import { ResponseResult } from 'features/ResponseResult';
import { Path } from 'shared/types/path';
import { encodeUrlGraphQl } from 'shared/lib/dataConverters/encodeUrlGraphQl/encodeUrlGraphQl';
import { SerachParams } from 'shared/types/graphQl';
import { notFound } from 'next/navigation';

type Props = {
  params: { graphReq: [string, string] };
  searchParams?: SerachParams;
};

const GraphQlPage: FC<Props> = async ({ params, searchParams }) => {
  const { graphReq } = params;

  if (!graphReq[1]) {
    return <ResponseResult redactor={Path.GRAPH} />;
  }

  try {
    const data = encodeUrlGraphQl(graphReq[0], graphReq[1], searchParams);
    const result = await fetchGraphQlData(data);

    return (
      result && (
        <ResponseResult
          response={{
            body: JSON.stringify(result?.data, null, 2),
            status: +result.status,
          }}
          redactor={Path.GRAPH}
        />
      )
    );
  } catch {
    notFound();
  }
};

export default GraphQlPage;
