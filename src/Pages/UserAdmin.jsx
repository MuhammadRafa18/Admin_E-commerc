import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProdukContext } from "../Store/ProdukProvider";
import { UseFecth } from "../hooks/UseFecth";
import { ButtonCreate } from "../Component/ButtonCreate";
import { Table } from "../Component/Table";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { UseAction } from "../hooks/UseAction";

export const UserAdmin = () => {
  const { setUser } = useContext(ProdukContext);
  const navigate = useNavigate();
  const { Data } = UseFecth(`/admin/UserAdmin`);
  const { HandleDelete, HandleUpdate } = UseAction();
  const colums = [
    { key: "Nomor", label: "No", render: (_, index) => index + 1 },
    { key: "email", label: "email" },
    { key: "name", label: "name" },
    { key: "role", label: "role" },
    {
      key: "profile_image",
      label: "profile image",
      render: (item) => (
        <img
          src={`http://localhost:8000/storage/${item.profile_image}`}
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
            onClick={() => HandleUpdate("FormCategories", item.id)}
          />
          <ButtonDelete
            onClick={() => HandleDelete(`/admin/UserAdmin`, item.id)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-end space-y-4 md:space-y-6 lg:space-y-8 py-8 relative overflow-x-auto ">
      <ButtonCreate
        text={"Create User"}
        onClick={() => {
          setUser({});
          navigate(`/FormUserAdmin`);
        }}
      />
      <Table colums={colums} Data={Data} />
    </div>
  );
};
