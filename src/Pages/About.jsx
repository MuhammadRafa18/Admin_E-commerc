import { UseFecth } from "../hooks/UseFecth";
import { Table } from "../Component/Table";
import { ButtonCreate } from "../Component/ButtonCreate";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";
import { PagesContext } from "../Store/PagesProvider";
import { useContext } from "react";
import { Modal } from "../Component/Modal";
import { FormAbout } from "../Form/FormAbout";
import { UseAction } from "../hooks/UseAction";

export const About = () => {
  const { isOpen, setIsOpen, selectedData, setSelectedData } =
    useContext(PagesContext);
  const { Data, refetch } = UseFecth(`/admin/about`);
  const { HandleDelete } = UseAction();
  
  const colums = [
    {
      key: "headline",
      label: "headline",
    },
    {
      key: "title",
      label: "title",
    },
    {
      key: "subtitle",
      label: "subtitle",
    },
    {
      key: "image",
      label: "image",
      render: (item) => (
        <img
          src={`http://localhost:8000/storage/${item.image}`}
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
            onClick={() => HandleDelete(`admin/about`, item.id, refetch)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-end space-y-4 md:space-y-6 lg:space-y-8 py-8 relative overflow-x-auto">
      {Data?.length === 0 ? (
        <ButtonCreate
          text={"Create About"}
          onClick={() => {
            setSelectedData(null);
            setIsOpen(true);
          }}
        />
      ) : null}
      <Table colums={colums} Data={Data} />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={selectedData ? "Edit About" : "Create About"}
      >
        <FormAbout
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
