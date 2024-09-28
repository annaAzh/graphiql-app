import { Path } from 'shared/types/path';
import { VALID_METHODS } from './global';

export const PRIVATE_PAGES: string[] = [
  Path.GRAPH,
  Path.HISTORY,
  Path.REST,
  ...VALID_METHODS,
].map((path) => `/${path}`);

export const PUBLIC_PAGES: string[] = [Path.SIGN_IN, Path.SIGN_UP].map(
  (path) => `/${path}`
);
