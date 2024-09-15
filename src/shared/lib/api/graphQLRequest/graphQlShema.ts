import axios, { AxiosError } from 'axios';
import {
  GraphQlResponse,
  GraphQlSchemaResponse,
  IntrospectionQueryRequest,
} from 'shared/types/graphQl';
import INTROSPECTION_QUERY from './IntrospectionQuery';

const fetchSDLSchema = async (
  schemaEndpoint: string
): Promise<GraphQlResponse | undefined> => {
  try {
    const body: IntrospectionQueryRequest = {
      operationName: 'IntrospectionQuery',
      query: INTROSPECTION_QUERY,
    };

    const res = await axios.post<GraphQlSchemaResponse>(schemaEndpoint, body);

    if (res.data && res.data.data) {
      return { status: res.status, data: res.data.data };
    }
  } catch (e) {
    return e instanceof AxiosError && e && e.response
      ? { status: e.name, data: e.message }
      : e instanceof Error
        ? { status: e.name, data: e.message }
        : undefined;
  }
};

export { fetchSDLSchema };
