import { FormikProvider } from 'formik';
import dynamic from 'next/dynamic';

import { Alert, Loading } from '@/components/atoms';
import { Tab, TabPanel, Tabs } from '@/components/atoms/tabs';
import { Layout } from '@/components/layouts/App';
import { HeaderBar } from '@/components/organism/partial';
import { TableProduct, TableTopping } from '@/components/organism/table';
import { NoSsrWrapper } from '@/context/NoSsrWrapper';
import { useAdminProduct } from '@/hooks/admin/useAdminProduct';
import { useUser } from '@/hooks/useUser';
import type { ModalFormProductProps, ModalFormToppingProps } from '@/types';

const ModalFormProduct = dynamic<ModalFormProductProps>(
  () => import('@/components/organism/modal/ModalFormProduct').then((mod) => mod.ModalFormProduct),
  { ssr: false },
);
const ModalFormTopping = dynamic<ModalFormToppingProps>(
  () => import('@/components/organism/modal/ModalFormTopping').then((mod) => mod.ModalFormTopping),
  { ssr: false },
);

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
  const { user, loadingGetUser } = useUser();
  const {
    alert,
    formProductProvider,
    isModalFormProductOpen,
    isModalFormToppingOpen,
    loadingGet,
    panelIndex,
    products,
    toppings,
    selectedProduct,
    selectedTopping,
    handleAttachFile,
    handleChangeTabPanel,
    handleCloseAlert,
    handleDeleteProduct,
    handleDeleteTopping,
    handleOpenModalFormProduct,
    handleOpenModalFormTopping,
    handleUpdateProductAvailability,
    handleUpdateToppingAvailability,
    handleCloseModalFormProduct,
    handleCloseModalFormTopping,
  } = useAdminProduct();

  if (loadingGetUser) {
    return <Loading />;
  }

  return (
    <NoSsrWrapper>
      <Layout
        head={{
          title: 'Admin Product | Waysbucks Coffee',
          description: 'Waysbucks admin product',
        }}>
        <HeaderBar user={user} />
        <main id="main-content" className="main-container">
          <div className="flex flex-container flex-col lg:flex-row">
            <Tabs
              value={panelIndex}
              className="flex-item"
              aria-label="admin products tabs"
              onChange={handleChangeTabPanel}>
              <Tab label="Products" {...a11yPropsTab(0)} />
              <Tab label="Toppings" {...a11yPropsTab(1)} />
            </Tabs>
            <TabPanel
              index={0}
              value={panelIndex}
              className={panelIndex === 0 ? 'flex-item flex-auto' : ''}
              {...a11yPropsTabPanel(0)}>
              <TableProduct
                loadingGet={loadingGet}
                products={products}
                onDeleteProduct={handleDeleteProduct}
                onOpenModal={handleOpenModalFormProduct}
                onUpdateAvailability={handleUpdateProductAvailability}
              />
            </TabPanel>
            <TabPanel
              index={1}
              value={panelIndex}
              className={panelIndex === 1 ? 'flex-item flex-auto' : ''}
              {...a11yPropsTabPanel(1)}>
              <TableTopping
                loadingGet={loadingGet}
                toppings={toppings}
                onDeleteTopping={handleDeleteTopping}
                onOpenModal={handleOpenModalFormTopping}
                onUpdateAvailability={handleUpdateToppingAvailability}
              />
            </TabPanel>
          </div>
        </main>
        <FormikProvider value={formProductProvider}>
          <ModalFormProduct
            isOpen={isModalFormProductOpen}
            selectedProduct={selectedProduct}
            onAttachFile={handleAttachFile}
            onClose={handleCloseModalFormProduct}
          />
          <ModalFormTopping
            isOpen={isModalFormToppingOpen}
            selectedTopping={selectedTopping}
            onAttachFile={handleAttachFile}
            onClose={handleCloseModalFormTopping}
          />
        </FormikProvider>
        <Alert isOpen={alert.isOpen} severity={alert.status} position={{ top: 50 }} onClose={handleCloseAlert}>
          {alert.message}
        </Alert>
      </Layout>
    </NoSsrWrapper>
  );
}
