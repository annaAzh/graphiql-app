import { ResponseResult } from 'features/ResponseResult';
import { VALID_METHODS } from 'shared/constants';
import { getData } from 'shared/lib/api';
import { Path } from 'shared/types/path';
import { RestResponse, StringObject, ValidMethods } from 'shared/types/restful';
import { notFound } from 'next/navigation';

const RestfulPage = async ({
  params,
  searchParams,
}: {
  params: { req: [ValidMethods, string, string] | [ValidMethods, string] };
  searchParams?: StringObject;
}) => {
  try {
    const { req } = params;
    let result: RestResponse | undefined;

    if (![...VALID_METHODS, Path.REST].includes(req[0])) {
      throw new Error('Invalid required method');
    }

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

    return result && <ResponseResult data={result} />;
  } catch {
    notFound();
  }
};

export default RestfulPage;
