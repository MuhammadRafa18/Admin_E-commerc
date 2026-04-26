import React, { useContext, useState } from "react";
import { UseFecth } from "../hooks/UseFecth";
import { Table } from "../Component/Table";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { UseAction } from "../hooks/UseAction";
import { ButtonToggle } from "../Component/ButtonToggle";
import { Modal } from "../Component/Modal";
import { FormProduk } from "../Form/FormProduk";
import { ButtonCreate } from "../Component/ButtonCreate";
import { PagesContext } from "../Store/PagesProvider";

export const ProdukPage = () => {
  const { Data, refetch } = UseFecth(`/product`);
  const { HandleDelete, HandleToggle } = UseAction();
  const { isOpen, setIsOpen, selectedData, setSelectedData } =
    useContext(PagesContext);


  const colums = [
    { key: "Nomor", label: "No", render: (_, index) => index + 1 },
    {
      key: "image_banner",
      label: "Image Banner",
      render: (item) => (
        <img
          src={`http://localhost:8000/storage/${item.image_banner}`}
          alt=""
          className="w-10 mx-auto"
        />
      ),
    },

    {
      key: "title",
      label: "Title",
    },

    {
      key: "price",
      label: "Price",
      render: (item) =>
        item.product_sku?.price ? item.product_sku.price.toLocaleString() : "-",
    },

    {
      key: "size",
      label: "Size",
      render: (item) => item.product_sku?.detail?.size ?? "-",
    },

    {
      key: "stok",
      label: "Stock",
      render: (item) => item.product_sku?.stock ?? "-",
    },
    {
      key: "is_active",
      label: "Status",
      render: (item) => (
        <ButtonToggle
          isActive={item.is_active}
          onClick={() =>
            HandleToggle(`/admin/product`, item.id, item.is_active, refetch)
          }
        />
      ),
    },

    {
      key: "Actions",
      label: "Action",
      render: (item) => (
        <div className="flex items-center justify-center space-x-2">
          <ButtonUpdate
            onClick={() => {
              setSelectedData(item);
              setIsOpen(true);
            }}
          />
          <ButtonDelete
            onClick={() => HandleDelete(`/admin/product`, item.id, refetch)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-end space-y-4 md:space-y-6 lg:space-y-8 py-8 relative overflow-x-auto">
      <ButtonCreate
        onClick={() => {
          setSelectedData(null);
          setIsOpen(true);
        }}
        text={"Create Product"}
      />

      <Table colums={colums} Data={Data} filters={["skincare", "fashion"]} />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedData ? "Edit Produk" : "Create Produk"}
      >
        <FormProduk
          data={selectedData}
          onClose={() => setIsOpen(false)}
          onSuccess={() => {
            setIsOpen(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};
