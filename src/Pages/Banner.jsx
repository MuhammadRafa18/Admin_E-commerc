import React, { useContext } from "react";
import { PagesContext } from "../Store/PagesProvider";

import { UseFecth } from "../hooks/UseFecth";
import { UseAction } from "../hooks/UseAction";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { ButtonCreate } from "../Component/ButtonCreate";
import { Table } from "../Component/Table";

export const Banner = () => {
  const { setBanner } = useContext(PagesContext);
  const { Data } = UseFecth(`/banner`);
  const { HandleDelete, HandleUpdate } = UseAction();
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
          <ButtonUpdate onClick={() => HandleUpdate("FormType", item.id)} />
          <ButtonDelete
            onClick={() => HandleDelete(`admin/result, ${item.id}`)}
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
          setBanner({});
          navigate(`/FormProduk`);
        }}
      ></ButtonCreate>
      <Table colums={colums} Data={Data}></Table>
    </div>
  );
};
