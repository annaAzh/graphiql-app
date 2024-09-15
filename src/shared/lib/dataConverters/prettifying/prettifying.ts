import { js as beautifyJs } from 'js-beautify';

export const prettifying = (code: string): string => {
  return beautifyJs(code.replace(/\n+/g, '\n'), { indent_size: 2 });
};
