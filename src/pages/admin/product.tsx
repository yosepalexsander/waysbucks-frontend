import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { useState } from 'react';

import { Tab, TabPanel, Tabs } from '@/components/atoms/tabs';
import { Layout } from '@/components/layouts/App';
import { TableProduct, TableTopping } from '@/components/organism/table';
import type { User } from '@/types';
import { authSSR } from '@/utils';

function a11yPropsTab(index: number) {
  return {
    id: `products-tab-${index}`,
    'aria-controls': `products-tabpanel-${index}`,
  };
}
function a11yPropsTabPanel(index: number) {
  return {
    id: `products-tabpanel-${index}`,
    'aria-labelledby': `products-tab-${index}`,
  };
}

interface Props {
  user: User | null;
}

// eslint-disable-next-line import/no-default-export
export default function ProductPage({ user }: Props) {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Layout
      head={{
        title: 'Admin Product | Waysbucks Coffee',
        description: 'Waysbucks admin product',
      }}
      user={user}
      route="admin/product">
      <div className="flex flex-container flex-col lg:flex-row">
        <Tabs value={value} className="flex-item" aria-label="admin products tabs" onChange={handleChange}>
          <Tab label="Products" {...a11yPropsTab(0)} />
          <Tab label="Toppings" {...a11yPropsTab(1)} />
        </Tabs>
        <TabPanel
          index={0}
          value={value}
          className={value === 0 ? 'flex-item flex-auto' : ''}
          {...a11yPropsTabPanel(0)}>
          <TableProduct />
        </TabPanel>
        <TabPanel
          index={1}
          value={value}
          className={value === 1 ? 'flex-item flex-auto' : ''}
          {...a11yPropsTabPanel(0)}>
          <TableTopping />
        </TabPanel>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx): Promise<GetServerSidePropsResult<Props>> => {
  const user = await authSSR(ctx);

  if (user && user.is_admin) {
    return {
      props: {
        user,
      },
    };
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
