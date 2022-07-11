import { useFormik } from 'formik';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';

import {
  deleteProduct,
  deleteTopping,
  getProducts,
  getToppings,
  postProduct,
  postTopping,
  updateProduct,
  updateTopping,
  upload,
} from '@/api';
import type { FormikHelpers, FormProduct, Product, Topping } from '@/types';
import { ProductSchema, ToppingSchema } from '@/utils';

import { useAlert } from '../useAlert';
import { useDisclose } from '../useDisclose';

export const useAdminProduct = () => {
  const { alert, handleCloseAlert, handleOpenAlert } = useAlert();
  const {
    isOpen: isModalFormProductOpen,
    onOpen: onOpenModalFormProduct,
    onClose: onCloseModalFormProduct,
  } = useDisclose();
  const {
    isOpen: isModalFormToppingOpen,
    onOpen: onOpenModalFormTopping,
    onClose: onCloseModalFormTopping,
  } = useDisclose();
  const [panelIndex, setPanelIndex] = useState(0);
  const [currentForm, setCurrentForm] = useState<'product' | 'topping'>('product');
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [selectedTopping, setSelectedTopping] = useState<Topping>();

  const {
    data: dataProducts,
    error: productError,
    mutate: productMutation,
  } = useSWR('/products', getProducts, {
    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error?.status === 404) return;
      if (retryCount > 3) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });
  const {
    data: dataToppings,
    error: toppingError,
    mutate: toppingMutation,
  } = useSWR('/toppings', getToppings, {
    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error.status === 404) return;
      if (retryCount > 3) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  const products = useMemo(() => {
    let data: Product[] = [];

    if (!dataProducts) {
      return data;
    }

    data = dataProducts.slice(0);

    return data;
  }, [dataProducts]);

  const toppings = useMemo(() => {
    let data: Topping[] = [];

    if (!dataToppings) {
      return data;
    }

    data = dataToppings.slice(0);

    return data;
  }, [dataToppings]);

  const handleOpenModalFormProduct = useCallback(
    (item?: Product) => {
      setCurrentForm('product');
      setSelectedProduct(item);
      onOpenModalFormProduct();
    },
    [onOpenModalFormProduct],
  );

  const handleCreateProduct = useCallback(
    async (item: Partial<Product>) => {
      const optimisticData = [item as Product, ...products];

      try {
        await productMutation(
          async (draft) => {
            await postProduct(item);

            return draft;
          },
          { optimisticData, rollbackOnError: true },
        );
      } catch (error) {
        console.log(error);
      } finally {
        onCloseModalFormProduct();
      }
    },
    [onCloseModalFormProduct, productMutation, products],
  );

  const handleUpdateProduct = useCallback(
    async (id: number, body: Partial<Product>) => {
      const optimisticData = products.slice(0);
      const idx = optimisticData.findIndex((item) => item.id === id);
      optimisticData[idx] = { id, ...body } as Product;

      try {
        await productMutation(
          async (draft) => {
            await updateProduct(id, body);

            return draft;
          },
          { optimisticData, rollbackOnError: true },
        );
      } catch (error) {
        console.log(error);
      } finally {
        onCloseModalFormProduct();
      }
    },
    [onCloseModalFormProduct, productMutation, products],
  );

  const handleUpdateProductAvailability = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, item: Product) => {
      const data: Product = {
        ...item,
        is_available: e.target.checked,
      };

      try {
        await handleUpdateProduct(data.id, data);
      } catch (error) {
        console.log(error);
      }
    },
    [handleUpdateProduct],
  );

  const handleDeleteProduct = useCallback(
    async (id: number) => {
      const optimisticData = products.filter((item) => item.id !== id);

      try {
        await productMutation(
          async (draft) => {
            await deleteProduct(id);

            return draft;
          },
          { optimisticData, rollbackOnError: true },
        );
      } catch (error) {
        console.log(error);
      }
    },
    [productMutation, products],
  );

  const handleOpenModalFormTopping = useCallback(
    (item?: Topping) => {
      setCurrentForm('topping');
      setSelectedTopping(item);
      onOpenModalFormTopping();
    },
    [onOpenModalFormTopping],
  );

  const handleCloseModalFormProduct = useCallback(() => {
    setSelectedProduct(undefined);
    onCloseModalFormProduct();
  }, [onCloseModalFormProduct]);

  const handleCloseModalFormTopping = useCallback(() => {
    setSelectedTopping(undefined);
    onCloseModalFormTopping();
  }, [onCloseModalFormTopping]);

  const handleCreateTopping = useCallback(
    async (item: Partial<Topping>) => {
      const optimisticData = [item as Topping, ...toppings];

      try {
        await toppingMutation(
          async (draft) => {
            await postTopping(item);

            return draft;
          },
          { optimisticData, rollbackOnError: true },
        );
      } catch (error) {
        console.log(error);
      } finally {
        onCloseModalFormTopping();
      }
    },
    [onCloseModalFormTopping, toppingMutation, toppings],
  );

  const handleUpdateTopping = useCallback(
    async (id: number, body: Partial<Topping>) => {
      const optimisticData = toppings.slice(0);
      const idx = optimisticData.findIndex((item) => item.id === id);
      optimisticData[idx] = { id, ...body } as Topping;

      try {
        await toppingMutation(
          async (draft) => {
            await updateTopping(id, body);

            return draft;
          },
          { optimisticData, rollbackOnError: true },
        );
      } catch (error) {
        console.log(error);
      } finally {
        onCloseModalFormTopping();
      }
    },
    [onCloseModalFormTopping, toppingMutation, toppings],
  );

  const handleUpdateToppingAvailability = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, item: Topping) => {
      const data: Topping = {
        ...item,
        is_available: e.target.checked,
      };

      try {
        await handleUpdateTopping(data.id, data);
      } catch (error) {
        console.log(error);
      }
    },
    [handleUpdateTopping],
  );

  const handleDeleteTopping = useCallback(
    async (id: number) => {
      const optimisticData = toppings.filter((item) => item.id !== id);

      try {
        await toppingMutation(
          async (draft) => {
            await deleteTopping(id);

            return draft;
          },
          { optimisticData, rollbackOnError: true },
        );
      } catch (error) {
        console.log(error);
      }
    },
    [toppingMutation, toppings],
  );

  const handleChangeTabPanel = useCallback((index: number) => {
    setPanelIndex(index);
  }, []);

  const handleSubmitProduct = useCallback(
    async (values: FormProduct, formikHelpers: FormikHelpers<FormProduct>): Promise<void> => {
      const { file, ...product } = values;

      try {
        if (file) {
          const form = new FormData();
          form.append('file', file);

          const { filename } = await upload(form);

          product.image = filename;
        } else {
          delete product.image;
        }

        if (currentForm === 'topping') {
          selectedTopping ? await handleUpdateTopping(selectedTopping.id, product) : await handleCreateTopping(product);
          return;
        }

        selectedProduct ? await handleUpdateProduct(selectedProduct.id, product) : await handleCreateProduct(product);

        formikHelpers.resetForm();
      } catch (error) {
        console.log(error);

        if (error instanceof Error) {
          handleOpenAlert('error', `Error: ${error.message}`);
        }
      } finally {
      }
    },
    [
      currentForm,
      selectedTopping,
      handleUpdateTopping,
      handleCreateTopping,
      selectedProduct,
      handleUpdateProduct,
      handleCreateProduct,
      handleOpenAlert,
    ],
  );

  const formProductProvider = useFormik<FormProduct>({
    initialValues: {
      name: currentForm === 'topping' ? selectedTopping?.name : selectedProduct?.name,
      description: currentForm === 'topping' ? undefined : selectedProduct?.description,
      price: currentForm === 'topping' ? selectedTopping?.price : selectedProduct?.price,
      image: currentForm === 'topping' ? selectedTopping?.image : selectedProduct?.image,
    },
    enableReinitialize: true,
    validationSchema: currentForm === 'topping' ? ToppingSchema : ProductSchema,
    onSubmit: handleSubmitProduct,
  });
  const { setFieldValue } = formProductProvider;

  const handleAttachFile = useCallback(
    (file?: File) => {
      setFieldValue('file', file);
    },
    [setFieldValue],
  );

  const loadingGet = (!productError && !dataProducts) || (!toppingError && !dataToppings);

  return {
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
    handleCloseModalFormProduct,
    handleCloseModalFormTopping,
    handleCreateProduct,
    handleCreateTopping,
    handleDeleteProduct,
    handleDeleteTopping,
    handleOpenModalFormProduct,
    handleOpenModalFormTopping,
    handleUpdateProduct,
    handleUpdateTopping,
    handleUpdateProductAvailability,
    handleUpdateToppingAvailability,
  };
};
