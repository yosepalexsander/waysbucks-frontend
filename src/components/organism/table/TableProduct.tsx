import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import useSWR from 'swr';

import { deleteProduct, getProducts, updateProduct } from '@/api';
import { NoData } from '@/assets/images';
import { Button, Modal, Paper } from '@/components/atoms';
import { FormProduct } from '@/components/organism/form';
import type { Product } from '@/types';
import { currencyFormat } from '@/utils';

import { TableSkeleton } from './TableSkeleton';

export const TableProduct = () => {
  const [show, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const {
    data: dataProduct,
    error,
    mutate: productMutation,
  } = useSWR('/products', getProducts, {
    onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
      if (error?.status === 404) return;
      if (retryCount >= 5) return;
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  const products = useMemo(() => {
    let data: Product[] = [];

    if (!dataProduct) {
      return data;
    }

    data = dataProduct.slice(0);

    return data;
  }, [dataProduct]);

  const onMutationUpdate = async (product: Product) => {
    const idx = products.findIndex((item) => item.id === product.id);
    products[idx] = product;
    await productMutation(products, false);
  };

  const onClickUpdate = (item: Product) => {
    setShowModal(true);
    setSelectedProduct(item);
  };

  const onClickAdd = () => {
    setShowModal(true);
    setSelectedProduct(undefined);
  };

  // always reset state on close modal
  const onCloseModal = () => {
    setShowModal(false);
  };

  // refetch after submitting product data
  const onSubmitSuccess = () => {
    setShowModal(false);
    productMutation();
  };

  const onUpdateAvailability = async (e: ChangeEvent<HTMLInputElement>, item: Product) => {
    const data: Partial<Product> = {
      is_available: e.target.checked,
    };

    try {
      await updateProduct(Number(e.target.id), data);
      const updatedProduct: Product = { ...item, is_available: e.target.checked };
      await onMutationUpdate(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteproduct = async (id: number) => {
    try {
      await deleteProduct(id);
      await productMutation();
    } catch (error) {
      console.error(error);
    }
  };

  if (error && error.status === 404) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="img-container max-w-sm mb-4">
          <Image src={NoData} alt="no data" layout="responsive" width={50} height={50} objectFit="cover" />
        </div>
        <p>Looks like there is no product</p>
        <button onClick={onClickAdd} className="mt-2 text-blue-600">
          Add New
        </button>
        <Modal isOpen={show} onClose={onCloseModal}>
          <Paper
            width="100%"
            maxWidth="24rem"
            transform="translate(-50%, -50%)"
            top="50%"
            left="50%"
            padding={16}
            position="absolute"
            display="flex"
            flexDirection="column"
            alignItems="center">
            <p className="text-3xl mb-4 text-center text-primary">{selectedProduct ? 'Update' : 'New'} Product</p>
            <FormProduct
              oldProduct={selectedProduct}
              isUpdate={selectedProduct ? true : false}
              onSubmitSuccess={onSubmitSuccess}
            />
          </Paper>
        </Modal>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={onClickAdd} variant="contained" color="warning" className="mb-2">
          Add New
        </Button>
      </div>
      <div className="overflow-auto">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              <>
                {products.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td className="table-name">{item.name}</td>
                    <td className="table-img">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        objectFit="contain"
                        layout="responsive"
                        className="rounded-md"
                      />
                    </td>
                    <td className="table-price">{currencyFormat(item.price)}</td>
                    <td>
                      <input
                        type="checkbox"
                        name={item.name}
                        id={`${item.id}`}
                        checked={item.is_available}
                        onChange={(e) => onUpdateAvailability(e, item)}
                      />
                    </td>
                    <td>
                      <Button
                        id={`update-${item.id}`}
                        variant="contained"
                        color="secondary"
                        onClick={() => onClickUpdate(item)}
                        className="m-1 w-20"
                        style={{ padding: '0.25rem' }}>
                        Update
                      </Button>
                      <Button
                        id={`delete-${item.id}`}
                        variant="outlined"
                        color="danger"
                        onClick={() => onDeleteproduct(item.id)}
                        className="m-1 w-20"
                        style={{ padding: '0.25rem' }}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <TableSkeleton />
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={show} onClose={onCloseModal}>
        <Paper
          width="100%"
          maxWidth="24rem"
          transform="translate(-50%, -50%)"
          top="50%"
          left="50%"
          padding={16}
          position="absolute"
          display="flex"
          flexDirection="column"
          alignItems="center">
          <p className="text-3xl mb-4 text-center text-primary">{selectedProduct ? 'Update' : 'New'} Product</p>
          <FormProduct
            oldProduct={selectedProduct}
            isUpdate={selectedProduct ? true : false}
            onSubmitSuccess={onSubmitSuccess}
          />
        </Paper>
      </Modal>
    </>
  );
};
