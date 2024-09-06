import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { encodeRest } from 'shared/lib/dataConverters';
import { Path } from 'shared/types/path';
import { PartialRest } from 'shared/types/restful';

export const useEncodeProps = () => {
  const [state, setState] = useState<PartialRest>({});
  const navigate = useRouter();

  const setEncodeValue = (
    key: keyof PartialRest,
    value: PartialRest[keyof PartialRest]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!state) return;
    const path = encodeRest(state);

    navigate.push(`/${Path.REST}${path}`);
  }, [state]);

  return { setEncodeValue };
};
