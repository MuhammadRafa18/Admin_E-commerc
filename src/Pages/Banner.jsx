import React, { useContext } from "react";
import { PagesContext } from "../Store/PagesProvider";

import { UseFecth } from "../hooks/UseFecth";
import { UseAction } from "../hooks/UseAction";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { ButtonCreate } from "../Component/ButtonCreate";
import { Table } from "../Component/Table";
import { Modal } from "../Component/Modal";
import { FormBanner } from "../Form/FormBanner";

export const Banner = () => {
  const { isOpen, setIsOpen, selectedData, setSelectedData } =
    useContext(PagesContext);
  const { Data, refetch } = UseFecth(`/banner`);
  const { HandleDelete } = UseAction();
  const colums = [
    {
      key: "banner",
      label: "banner",
      render: (item) => (
        <img
          src={`http://localhost:8000/storage/${item.banner}`}
          alt=""
          className="w-10 mx-auto"
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
            onClick={() => HandleDelete(`admin/banner`, item.id, refetch)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-end space-y-4 md:space-y-6 lg:space-y-8 py-8 relative overflow-x-auto">
      <ButtonCreate
        text={"Create Banner"}
        onClick={() => {
          setSelectedData(null);
          setIsOpen(true);
        }}
      ></ButtonCreate>
      <Table colums={colums} Data={Data}></Table>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedData ? "Edit Banner" : "Create Banner"}
      >
        <FormBanner
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
