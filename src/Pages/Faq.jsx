import React, { useContext } from "react";
import { PagesContext } from "../Store/PagesProvider";
import { useNavigate } from "react-router";
import { UseFecth } from "../hooks/UseFecth";
import { ButtonCreate } from "../Component/ButtonCreate";
import { UseAction } from "../hooks/UseAction";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { Table } from "../Component/Table";

export const Faq = () => {
  const { setFaq } = useContext(PagesContext);
  const navigate = useNavigate();
  const { Data } = UseFecth(`/Faq_category`);
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
          <ButtonUpdate onClick={() => HandleUpdate("FormType", item.id)} />
          <ButtonDelete
            onClick={() => HandleDelete(`admin/Faq_category, ${item.id}`)}
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
          setFaq({});
          navigate(`/FormCategories`);
        }}
      />
      <Table colums={colums} Data={Data}/>
    </div>
  );
};
