import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { encodeRest } from 'shared/lib/dataConverters';
import { encodeGraphql } from 'shared/lib/dataConverters/encodeGraphQl/encodeQraphQl';
import { PartialGraphQL } from 'shared/types/graphQl';
import { Path } from 'shared/types/path';
import { PartialRest } from 'shared/types/restful';

type Mode = 'REST' | 'GRAPHQL';

export const useEncodeProps = (mode: Mode = 'REST') => {
  const [state, setState] = useState<PartialRest | PartialGraphQL>({});
  const navigate = useRouter();

  const setEncodeValue = (
    key: keyof PartialRest | keyof PartialGraphQL,
    value: PartialRest[keyof PartialRest] | PartialGraphQL[keyof PartialGraphQL]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!Object.keys(state).length) return;
    if (mode === 'REST') {
      const path = encodeRest(state);
      navigate.push(`/${Path.REST}${path}`);
    } else {
      const path = encodeGraphql(state);
      navigate.push(`${path}`);
    }
  }, [state]);

  return { setEncodeValue };
};
