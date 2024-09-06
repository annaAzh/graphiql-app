import { FC } from 'react';
import { fetchGraphQlData } from 'shared/lib/api';
import { decode64 } from 'shared/lib/dataConverters';
import { KeyValueGraphQl } from 'shared/types/graphQl';
import { ResponseResult } from 'features/ResponseResult';
import { Path } from 'shared/types/path';

type Props = {
  params: { graphReq: [string, string] };
  searchParams?: { [key: string]: string };
};

const GraphQlPage: FC<Props> = async ({ params, searchParams }) => {
  try {
    const { graphReq } = params;

    const baseUrl = decode64(decodeURIComponent(graphReq[0]));
    const query = decode64(decodeURIComponent(graphReq[1]));
    const requestHeaders: KeyValueGraphQl[] = [];
    const requestVariables: KeyValueGraphQl[] = [];

    if (searchParams) {
      for (const key in searchParams) {
        if (key.startsWith('header_')) {
          requestHeaders.push({
            key: key.replace(/header_/, ''),
            value: decode64(decodeURIComponent(searchParams[key])),
          });
        }
        if (key.startsWith('variable_')) {
          requestVariables.push({
            key: key.replace(/variable_/, ''),
            value: decode64(decodeURIComponent(searchParams[key])),
          });
        }
      }
    }

    const data = {
      baseUrl,
      query,
      requestHeaders,
      variables: requestVariables,
    };

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
