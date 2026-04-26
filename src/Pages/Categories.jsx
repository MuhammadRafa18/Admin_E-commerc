import { UseFecth } from "../hooks/UseFecth";
import { Table } from "../Component/Table";
import { ButtonCreate } from "../Component/ButtonCreate";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { UseAction } from "../hooks/UseAction";
import { ButtonToggle } from "../Component/ButtonToggle";
import { PagesContext } from "../Store/PagesProvider";
import { useContext } from "react";
import { Modal } from "../Component/Modal";
import { FormCategories } from "../Form/FormCategories";

export const Categories = () => {
  const { Data, refetch } = UseFecth(`/category`);
  const { isOpen, setIsOpen, selectedData, setSelectedData } =
    useContext(PagesContext);
  const { HandleUpdate, HandleDelete, HandleToggle } =
    UseAction();
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
          onClick={() =>
            HandleToggle(`/admin/category`, item.id, item.is_active, refetch)
          }
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
            onClick={() => HandleDelete(`/admin/category`, item.id, refetch)}
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
          setSelectedData(null);
          setIsOpen(true);
        }}
      />
      <Table colums={colums} Data={Data} />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedData ? "Edit Category" : "Create Category"}
      >
        <FormCategories
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
