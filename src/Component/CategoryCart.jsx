import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { UseFecth } from "../hooks/UseFecth";
import { useMemo } from "react";

Chart.register(ArcElement, Tooltip, Legend);

export const CategoryCart = () => {
  const { Data } = UseFecth(`/admin/top-categories?filter=week`);
  const labels = Data?.data?.map((item) => item.categories_name) ?? [];
  const revenues = Data?.data?.map((item) => Number(item.total_revenue)) ?? [];
  const centerText = useMemo(
    () => ({
      id: "centerText",
      afterDraw(chart) {
        const { ctx } = chart;
        const total = chart.options.plugins.totalRevenue;
        const width = chart.width;
        const height = chart.height;

        ctx.save();
        ctx.font = "600 10px sans-serif";
        ctx.fillStyle = "#777";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Total Penjualan", width / 2, height / 2 - 12);

        ctx.font = "bold 14px sans-serif";
        ctx.fillStyle = "#333";
        ctx.fillText(
          total ? "Rp " + total.toLocaleString() : "Loading...",
          width / 2,
          height / 2 + 10,
        );
        ctx.restore();
      },
    }),
    [],
  );

  const data = {
    labels: labels,
    datasets: [
      {
        data: revenues,
        backgroundColor: ["#FF8A00", "#FFC77D", "#FFDAB3", "#CC6E00"],
        borderColor: "#fff",
        borderWidth: 4,
        hoverOffset: 8,
        borderRadius: 5,
      },
    ],
    plugins: [centerText],
  };
  const options = {
    responsive: true,
    cutout: "80%",
    plugins: {
      legend: {
        display: false,
      },
      totalRevenue: Data?.meta?.total_all_category_revenue,
    },
  };
  
  return (
    <div className="min-w-72 flex flex-col  items-center px-4 py-6 space-y-6 bg-gray-50 rounded-xl shadow-md">
      <span className="w-full font-semibold text-start">Top Category</span>
      <div className="w-44 h-44">
        <Doughnut data={data} options={options} plugins={[centerText]} />
      </div>
      {Data?.data?.map((item, index) => (
        <div className="w-full flex items-center justify-between " key={index}>
          <div className="flex space-x-2 items-center">
            <div
              className={`w-2.5 h-2.5 `}
              style={{ background: data?.datasets[0]?.backgroundColor[index] }}
            ></div>
            <span className="text-sm">{item.categories_name}</span>
          </div>
          <span className="text-xs">
            Rp {Number(item.total_revenue).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};
