import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import {
  DEFAULT_QUERY_GRAPHQL_EXAMPLE,
  DEFAULT_URL_GRAPHQL_EXAMPLE,
} from 'shared/constants';
import { decode64, decodeRest } from 'shared/lib/dataConverters';
import { RequestGraphQLData } from 'shared/types/graphQl';

type Params = {
  graphReq: [string, string];
};

export const useRestoreValues = ({
  setValue,
}: {
  setValue: UseFormSetValue<RequestGraphQLData>;
}) => {
  const searchParams = useSearchParams();
  const params: Params = useParams();

  useEffect(() => {
    (async () => {
      if (!params.graphReq) {
        setValue('url', DEFAULT_URL_GRAPHQL_EXAMPLE);
        setValue('body', DEFAULT_QUERY_GRAPHQL_EXAMPLE);
      } else if (params.graphReq[0] && !params.graphReq[1]) {
        const {
          body: queryBody,
        }: { body: string; variables: { key: string; value: string }[] } =
          JSON.parse(decode64(decodeURIComponent(params.graphReq[0])));

        setValue('body', queryBody);
      } else {
        const requestedUrl = params.graphReq[0];
        const requestedBody = params.graphReq[1];

        const requestedHeaders = searchParams
          ? Object.fromEntries(searchParams.entries())
          : {};
        const { headers, body, url, variables } = await decodeRest({
          requestedUrl,
          requestedBody,
          requestedHeaders,
        });
        setValue('url', url);

        if (variables) setValue('variables', [...variables, {}]);
        if (body) {
          setValue('body', body);
        }
        if (headers) {
          const formattedHeaders = Object.entries(headers).map((header) => {
            return { key: header[0], value: header[1] };
          });
          setValue('headers', [...formattedHeaders, {}]);
        }
      }
    })();
  }, []);
};
