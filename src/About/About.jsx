import { UseFecth } from "../hooks/UseFecth";
import { Table } from "../Component/Table";
import { ButtonCreate } from "../Component/ButtonCreate";
import { ButtonUpdate } from "../Component/ButtonUpdate";
import { ButtonDelete } from "../Component/ButtonDelete";

export const About = () => {
  const { Data } = UseFecth(`/admin/about`);
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
          <ButtonUpdate onClick={() => HandleUpdate("FormType", item.id)} />
          <ButtonDelete
            onClick={() => HandleDelete(`admin/result, ${item.id}`)}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
      <ButtonCreate
        text={"Create About"}
        onClick={() => {
          setAbout({});
          navigate(`/`);
        }}
      />
      <Table colums={colums} Data={Data} />
    </div>
  );
};
