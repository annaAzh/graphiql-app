const DEFAULT_URL_GRAPHQL_EXAMPLE = 'https://rickandmortyapi.com/graphql';

const DEFAULT_QUERY_GRAPHQL_EXAMPLE = `
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export { DEFAULT_URL_GRAPHQL_EXAMPLE, DEFAULT_QUERY_GRAPHQL_EXAMPLE };
