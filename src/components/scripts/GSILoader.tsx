import Script from 'next/script';
import React, { memo } from 'react';

import { useAuth } from '@/hooks/useAuth';

export const GSILoader = memo(() => {
  const { handleOnLoad } = useAuth();

  return <Script src="https://accounts.google.com/gsi/client" async onLoad={handleOnLoad} />;
});
