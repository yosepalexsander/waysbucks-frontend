import dynamic from 'next/dynamic';
import * as React from 'react';

import { Loading } from '@/components/atoms';

type Props = React.PropsWithChildren<Record<string, unknown>>;

const Wrapper = ({ children }: Props) => {
  return <React.Fragment>{children}</React.Fragment>;
};

export const NoSsrWrapper = dynamic(() => Promise.resolve(Wrapper), {
  ssr: false,
  loading: () => {
    return <Loading />;
  },
});
