import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { UseFecth } from "../hooks/UseFecth";
import { ProdukContext } from "../Store/ProdukProvider";
import { ButtonCreate } from "../Component/ButtonCreate";
import { Table } from "../Component/Table";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { UseAction } from "../hooks/UseAction";

export const DetailFaq = () => {
  const navigate = useNavigate();
  const { setDetailFaq } = useContext(ProdukContext);
  const { Data } = UseFecth(`/DetailFaq`);
  const { HandleDelete, HandleUpdate } = UseAction();
  const colums = [
    {
      key: "faq_category",
      label: "category ",
      render : (item) => (
        item.faq_category?.category ?? null
      ),
    },
    {
      key: "quest",
      label: "quest ",
    },
     {
      key: "answer",
      label: "answer ",
    },
    {
      key: "Actions",
      label: "Action",
      render: (item) => (
        <div className="flex items-center justify-center space-x-2">
          <ButtonUpdate onClick={() => HandleUpdate("FormType", item.id)} />
          <ButtonDelete
            onClick={() => HandleDelete(`admin/DetailFaq, ${item.id}`)}
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
          setDetailFaq({});
          navigate(`/FormCategories`);
        }}
      />
      <Table colums={colums} Data={Data} />
    </div>
  );
};
