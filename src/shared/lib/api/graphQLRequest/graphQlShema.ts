import axios from 'axios';
import {
  GraphQlResponse,
  GraphQlSchemaResponse,
  IntrospectionQueryRequest,
} from 'shared/types/graphQl';
import INTROSPECTION_QUERY from './IntrospectionQuery';

const fetchSDLSchema = async (
  schemaEndpoint: string
): Promise<GraphQlResponse | undefined> => {
  const body: IntrospectionQueryRequest = {
    operationName: 'IntrospectionQuery',
    query: INTROSPECTION_QUERY,
  };

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = await axios.post<GraphQlSchemaResponse>(schemaEndpoint, body, {
    headers,
  });

  if (res.data && res.data.data) {
    return { status: res.status, data: res.data.data };
  }
};

export { fetchSDLSchema };
