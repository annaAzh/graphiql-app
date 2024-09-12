import { Path } from 'shared/types/path';

export const PRIVATE_PAGES: string[] = [
  Path.GRAPH,
  Path.HISTORY,
  Path.REST,
].map((path) => `/${path}`);

export const PUBLIC_PAGES: string[] = [Path.SIGN_IN, Path.SIGN_UP].map(
  (path) => `/${path}`
);
