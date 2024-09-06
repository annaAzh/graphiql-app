import { js as beautifyJs } from 'js-beautify';

export const prettifying = (code: string): string => {
  return beautifyJs(code, { indent_size: 2 });
};
