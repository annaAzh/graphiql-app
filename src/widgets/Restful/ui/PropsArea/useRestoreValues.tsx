import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { DEFAULT_URL_EXAMPLE, VALID_METHODS } from 'shared/constants';
import { decodeRest } from 'shared/lib/dataConverters';
import { RestfulMethods, RestfulType } from 'shared/types/restful';

export const useRestoreValues = ({
  setValue,
}: {
  setValue: UseFormSetValue<RestfulType>;
}) => {
  const searchParams = useSearchParams();
  const params: {
    req: [RestfulMethods, string, string] | [RestfulMethods, string];
  } = useParams();

  useEffect(() => {
    (async () => {
      const method = params.req[0];
      if (method === 'REST') {
        setValue('url', DEFAULT_URL_EXAMPLE);
        setValue('method', VALID_METHODS[0]);
      } else {
        const requestedUrl = params.req[1];
        const requestedBody = params.req[2];
        const requestedHeaders = Object.fromEntries(searchParams.entries());
        const { headers, body, url, variables } = await decodeRest({
          requestedUrl,
          requestedBody,
          requestedHeaders,
        });
        setValue('url', url);
        setValue('method', method);
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
