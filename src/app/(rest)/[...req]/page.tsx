import { ResponseResult } from 'features/ResponseResult';
import { VALID_METHODS } from 'shared/constants';
import { getData } from 'shared/lib/api';
import {
  RestfulMethods,
  RestResponse,
  StringObject,
} from 'shared/types/restful';
import { notFound } from 'next/navigation';
import { Path } from 'shared/types/path';

const RestfulPage = async ({
  params,
  searchParams,
}: {
  params: { req: [RestfulMethods, string, string] | [RestfulMethods, string] };
  searchParams?: StringObject;
}) => {
  try {
    const { req } = params;
    let result: RestResponse | undefined;

    if (![...VALID_METHODS, `${Path.REST}`].includes(req[0])) {
      throw new Error('Invalid required path');
    }

    if (req[0] === 'REST') return <ResponseResult />;

    switch (req.length) {
      case 2:
        result = await getData(req[0], req[1], searchParams);
        break;
      case 3:
        result = await getData(req[0], req[1], searchParams, req[2]);
        break;
      default:
        result = undefined;
    }

    return <ResponseResult response={result} />;
  } catch {
    notFound();
  }
};

export default RestfulPage;
