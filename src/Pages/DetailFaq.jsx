import React, { useContext } from "react";
import { UseFecth } from "../hooks/UseFecth";

import { ButtonCreate } from "../Component/ButtonCreate";
import { Table } from "../Component/Table";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { UseAction } from "../hooks/UseAction";
import { PagesContext } from "../Store/PagesProvider";
import { Modal } from "../Component/Modal";
import { FormDetailFaq } from "../Form/FormDetailFaq";

export const DetailFaq = () => {
  const { isOpen, setIsOpen, selectedData, setSelectedData } =
    useContext(PagesContext);
  const { Data, refetch } = UseFecth(`/DetailFaq`);
  const stripHtml = (html) => html?.replace(/<[^>]*>/g, "") ?? "-";
  const { HandleDelete, HandleUpdate } = UseAction();
  const colums = [
    {
      key: "faq_category",
      label: "category ",
      render: (item) => item.faq_category?.category ?? null,
    },
    {
      key: "quest",
      label: "quest ",
    },
    {
      key: "answer",
      label: "Answer",
      render: (item) => (
        <span className=" truncate block ">
          {stripHtml(item.answer)}
        </span>
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
            onClick={() => HandleDelete(`admin/DetailFaq`, item.id, refetch)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-end space-y-4 md:space-y-6 lg:space-y-8 py-8 relative overflow-x-auto">
      <ButtonCreate
        text={"Create Detail Faq"}
        onClick={() => {
          setSelectedData(null);
          setIsOpen(true);
        }}
      />
      <Table colums={colums} Data={Data} />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedData ? "Edit Detail Faq" : "Create Detail Faq"}
      >
        <FormDetailFaq
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
