import { FC } from 'react';
import { fetchGraphQlData } from 'shared/lib/api';
import { ResponseResult } from 'features/ResponseResult';
import { Path } from 'shared/types/path';
import { encodeUrlGraphQl } from 'shared/lib/dataConverters/encodeUrlGraphQl/encodeUrlGraphQl';
import { SerachParams } from 'shared/types/graphQl';

type Props = {
  params: { graphReq: [string, string] };
  searchParams?: SerachParams;
};

const GraphQlPage: FC<Props> = async ({ params, searchParams }) => {
  try {
    const { graphReq } = params;
    const data = encodeUrlGraphQl(graphReq[0], graphReq[1], searchParams);
    const result = await fetchGraphQlData(data);

    return (
      result && (
        <ResponseResult
          response={{
            body: JSON.stringify(result?.data, null, 2),
            status: result.status,
          }}
          redactor={Path.GRAPH}
        />
      )
    );
  } catch {
    return <>Error</>;
  }
};

export default GraphQlPage;
