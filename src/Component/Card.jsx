const color = {
  green :"text-green-400",
  red :"text-red-400",
};
export const Card = ({ title, value, view, icon, persentase , colour }) => (
  <div
    className={`w-60 p-4 rounded-xl shadow-md text-black flex flex-col justify-center items-center bg-gray-50 hover:bg-orange-200  hover:scale-105 transition-transform cursor-pointer group`}
  >
    <div className=" w-full space-y-6 flex items-start justify-between">
      <h2 className="text-sm font-semibold">{title}</h2>
      <span className="p-1.5 bg-white group-hover:bg-hover rounded">
        {icon}
      </span>
    </div>
    <div className="w-full flex items-center justify-between">
      <p className="text-3xl font-bold ">{value}</p>
      <div className="flex flex-col text-end text-[10px]">
        <p className={`${color?.[colour]}`}>{persentase}</p>
        <p className="">{view}</p>
      </div>
    </div>
  </div>
);