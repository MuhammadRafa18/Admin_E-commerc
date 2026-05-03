import React, { useContext } from "react";
import { PagesContext } from "../Store/PagesProvider";
import { UseFecth } from "../hooks/UseFecth";
import { ButtonCreate } from "../Component/ButtonCreate";
import { UseAction } from "../hooks/UseAction";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { Table } from "../Component/Table";
import { Modal } from "../Component/Modal";
import { FormFaq } from "../Form/FormFaq";

export const Faq = () => {
  const { isOpen, setIsOpen, selectedData, setSelectedData } =
    useContext(PagesContext);
  const { Data, refetch } = UseFecth(`/Faq_category`);
  const { HandleDelete, HandleUpdate } = UseAction();
  const colums = [
    {
      key: "category",
      label: "category Faq",
    },
    {
      key: "Actions",
      label: "Action",
      render: (item) => (
        <div className="flex items-center justify-center space-x-2">
          <ButtonUpdate onClick={() => {setSelectedData(item); setIsOpen(true)}} />
          <ButtonDelete
            onClick={() => HandleDelete(`admin/Faq_category`,item.id , refetch)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-end space-y-4 md:space-y-6 lg:space-y-8 py-8 relative overflow-x-auto">
      <ButtonCreate
        text={"Create Faq Category"}
        onClick={() => {
          setSelectedData(null);
          setIsOpen(true);
        }}
      />
      <Table colums={colums} Data={Data} />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedData ? "Edit Category Faq" : "Create Category Faq"}
      >
        <FormFaq
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
