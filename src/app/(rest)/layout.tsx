import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Path } from 'shared/types/path';
import { Restful } from 'widgets/Restful';

const RestLayout = ({ children }: { children: ReactNode }) => {
  const cookie = cookies();
  const user = cookie.get('user');

  if (!user) redirect(Path.MAIN);

  return <Restful>{children}</Restful>;
};

export default RestLayout;
