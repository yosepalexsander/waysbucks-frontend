import { useRouter } from 'next/router';
import { useState } from 'react';

import { Loading } from '@/components/atoms';
import { Tab, TabPanel, Tabs } from '@/components/atoms/tabs';
import { Layout } from '@/components/layouts/App';
import { HeaderBar } from '@/components/organism/partial';
import { TableProduct, TableTopping } from '@/components/organism/table';
import { NoSsrWrapper } from '@/context/NoSsrWrapper';
import { useUser } from '@/hooks/useUser';

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

// eslint-disable-next-line import/no-default-export
export default function ProductPage() {
  const router = useRouter();
  const { user, loadingGet } = useUser();
  const [value, setValue] = useState(0);

  if (loadingGet) {
    return <Loading />;
  }

  if (user && !user.is_admin) {
    router.back();
    return null;
  }

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <NoSsrWrapper>
      <Layout
        head={{
          title: 'Admin Product | Waysbucks Coffee',
          description: 'Waysbucks admin product',
        }}>
        <HeaderBar user={user} />
        <main id="main-content" className="app-container">
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
        </main>
      </Layout>
    </NoSsrWrapper>
  );
}
