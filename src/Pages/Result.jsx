import React, { useContext } from "react";
import { UseFecth } from "../hooks/UseFecth";
import { useNavigate } from "react-router";
import { PagesContext } from "../Store/PagesProvider";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { Table } from "../Component/Table";
import { UseAction } from "../hooks/UseAction";
import { ButtonCreate } from "../Component/ButtonCreate";

export const Result = () => {
  const { setResult } = useContext(PagesContext);
  const navigate = useNavigate();
  const { Data } = UseFecth(`/result`);
  const { HandleDelete, HandleUpdate } = UseAction();
  const colums = [
    {
      key: "result",
      label: "result",
      render: (item) => (
        <img
          src={`http://localhost:8000/storage/${item.result}`}
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
            onClick={() => HandleDelete(`admin/result, ${item.id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-end space-y-4 md:space-y-6 lg:space-y-8 py-8 relative overflow-x-auto  ">
      <ButtonCreate
        text={"Create result"}
        onClick={() => {
          setResult({});
          navigate(`/FormProduk`);
        }}
      ></ButtonCreate>
      <Table colums={colums} Data={Data}></Table>
    </div>
  );
};
