import { ReactNode } from 'react';
import { Restful } from 'widgets/Restful';

const RestLayout = ({ children }: { children: ReactNode }) => {
  return <Restful>{children}</Restful>;
};

export default RestLayout;
