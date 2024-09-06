import { HeadersItem } from 'shared/types/restful';
import { encode64 } from '../encode64/encode64';
import { BodyUrlType } from 'shared/types/app';

export const encodeBody = ({ body, variables }: BodyUrlType) => {
  let formattedBody: BodyUrlType | undefined;

  if (body) {
    formattedBody = { body };
  }

  if (variables) {
    const formattedVariables: HeadersItem[] = [];
    variables.forEach((variable) => {
      if (variable.key !== undefined && variable.value !== undefined) {
        formattedVariables.push(variable);
      }
    });
    if (formattedVariables.length > 0) {
      formattedBody = { ...formattedBody, variables: formattedVariables };
    }
  }

  const res = formattedBody
    ? encode64(JSON.stringify(formattedBody))
    : undefined;

  return res;
};
