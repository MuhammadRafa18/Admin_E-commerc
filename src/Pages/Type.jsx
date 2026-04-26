import { useNavigate } from "react-router";
import { UseFecth } from "../hooks/UseFecth";
import { ButtonCreate } from "../Component/ButtonCreate";
import { Table } from "../Component/Table";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { UseAction } from "../hooks/UseAction";
import { PagesContext } from "../Store/PagesProvider";
import { useContext } from "react";
import { Modal } from "../Component/Modal";
import { FormType } from "../Form/FormType";

export const Type = () => {
  const { Data, refetch } = UseFecth(`/SkinTypes`);
  const { isOpen, setIsOpen, selectedData, setSelectedData } =
    useContext(PagesContext);
  const { HandleUpdate, HandleDelete } = UseAction();
  const colums = [
    { key: "type", label: "Type" },
    {
      key: "image",
      label: "Image",
      render: (item) => (
        <img
          src={`http://localhost:8000/storage/${item.image}` ?? "-"}
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
            onClick={() => HandleDelete(`admin/SkinTypes`, item.id, refetch)}
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
          setSelectedData(null);
          setIsOpen(true);
        }}
      />
      <Table colums={colums} Data={Data} />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedData ? "Edit Type" : "Create Type"}
      >
        <FormType
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
