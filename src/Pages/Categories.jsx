import React, { useContext } from "react";
import { ProdukContext } from "../Store/ProdukProvider";
import { useNavigate } from "react-router";
import { UseFecth } from "../hooks/UseFecth";
import { AuthContext } from "../Store/AuthContext";
import { Table } from "../Component/Table";
import { ButtonCreate } from "../Component/ButtonCreate";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { UseAction } from "../hooks/UseAction";
import { ButtonToggle } from "../Component/ButtonToggle";

export const Categories = () => {
  const { setCategories } = useContext(ProdukContext);
  const navigate = useNavigate();
  const { Data } = UseFecth(`/category`);
  const { HandleUpdate, HandleDelete,HandleToggle } = UseAction();
  const colums = [
    { key: "Nomor", label: "No", render: (_, index) => index + 1 },
    { key: "category", label: "Category" },
    { key: "type", label: "type" },
    {
      key: "is_active",
      label: "Status",
      render: (item) => (
        <ButtonToggle
          isActive={item.is_active}
          onClick={() => HandleToggle(`/admin/category`,item.id, item.is_active,setCategories)}
        />
      ),
    },
    {
      key: "Actions",
      label: "Action",
      render: (item) => (
        <div className="flex items-center justify-center space-x-2">
          <ButtonUpdate
            onClick={() => HandleUpdate("FormCategories", item.id)}
          />
          <ButtonDelete
            onClick={() => HandleDelete(`/category`, item.id)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-end space-y-4 md:space-y-6 lg:space-y-8 py-8 relative overflow-x-auto">
      <ButtonCreate
        text={"Create Category"}
        onClick={() => {
          setCategories({});
          navigate(`/FormCategories`);
        }}
      />
      <Table colums={colums} Data={Data} />
    </div>
  );
};
