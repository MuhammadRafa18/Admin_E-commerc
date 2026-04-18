import React, { useContext } from "react";
import { ProdukContext } from "../Store/ProdukProvider";
import { useNavigate } from "react-router";
import { UseFecth } from "../hooks/UseFecth";
import { ButtonCreate } from "../Component/ButtonCreate";
import { Table } from "../Component/Table";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { UseAction } from "../hooks/UseAction";

export const Type = () => {
  const { setType } = useContext(ProdukContext);
  const { Data } = UseFecth(`/SkinTypes`);
  const navigate = useNavigate();
  const { HandleUpdate, HandleDelete } = UseAction();
  const colums = [
    { key: "type", label: "Type" },
    {
      key: "image",
      label: "Image",
      render: (item) => (
        <img
          src={`http://localhost:8000/storage/${item.image}` ?? '-'} 
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
          <ButtonUpdate onClick={() => HandleUpdate("FormType", item.id)} />
          <ButtonDelete
            onClick={() => HandleDelete(`admin/SkinTypes, ${item.id}`)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-end space-y-4 md:space-y-6 lg:space-y-8 py-8 relative overflow-x-auto ">
      <ButtonCreate
        text={"Create Type"}
        onClick={() => {
          setType({});
          navigate(`/FormType`);
        }}
      />
      <Table colums={colums} Data={Data} />
    </div>
  );
};
