import React, { useContext } from "react";
import { UseFecth } from "../hooks/UseFecth";
import { useNavigate } from "react-router";
import { PagesContext } from "../Store/PagesProvider";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { Table } from "../Component/Table";
import { UseAction } from "../hooks/UseAction";
import { ButtonCreate } from "../Component/ButtonCreate";
import { Modal } from "../Component/Modal";
import { FormResult } from "../Form/FormResult";

export const Result = () => {
  const { isOpen, setIsOpen, selectedData, setSelectedData } =
    useContext(PagesContext);
  const { Data, refetch } = UseFecth(`/result`);
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
          <ButtonUpdate
            onClick={() => {
              setSelectedData(item);
              setIsOpen(true);
            }}
          />
          <ButtonDelete
            onClick={() => HandleDelete(`admin/result`, item.id, refetch)}
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
          setSelectedData(null);
          setIsOpen(true);
        }}
      ></ButtonCreate>
      <Table colums={colums} Data={Data}></Table>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedData ? "Edit Result" : "Create Result"}
      >
        <FormResult
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
