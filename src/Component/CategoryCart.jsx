import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { UseFecth } from "../hooks/UseFecth";

Chart.register(ArcElement, Tooltip, Legend);

export const CategoryCart = () => {
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/category`);
  const category = Data?.data?.map((item) => item.category);
  const centerText = {
    id: "centerText",
    afterDraw(chart) {
      const { ctx } = chart;

      // hitung total
      const total = chart.config.data.datasets[0].data.reduce(
        (a, b) => a + b,
        0
      );

      const width = chart.width;
      const height = chart.height;

      ctx.save();

      // ---- BARIS 1: LABEL ----
      ctx.font = "600 10px sans-serif"; // lebih kecil dari total
      ctx.fillStyle = "#777"; // abu-abu soft biar gak ngalahin angka
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Total Penjualan", width / 2, height / 2 - 12);

      // ---- BARIS 2: TOTAL ----
      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = "#333";
      ctx.fillText("Rp " + total.toLocaleString(), width / 2, height / 2 + 10);

      ctx.restore();
    },
  };
  const data = {
    labels: category,
    datasets: [
      {
        data: [1200000, 950000, 750000, 850000],
        backgroundColor: ["#FF8A00", "#FFC77D", "#FFDAB3", "#CC6E00"],
        borderColor: "#fff", // warna gap
        borderWidth: 4, // tebal gap antar slice
        hoverOffset: 8,
        borderRadius: 5,
      },
    ],
    plugins: [centerText],
  };
  const options = {
    responsive: true,
    cutout: "80%", // lebar bolong tengah
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="min-w-72 flex flex-col  items-center px-4 py-6 space-y-6 bg-gray-50 rounded-xl shadow-md">
      <span className="w-full font-semibold text-start">Top Category</span>
      <div className="w-44 h-44">
        <Doughnut data={data} options={options} plugins={[centerText]} />
      </div>
      {category?.map((item, index) => (
        <div className="w-full flex items-center justify-between " key={index}>
          <div className="flex space-x-2 items-center">
            <div
              className={`w-2.5 h-2.5 `}
              style={{ background: data?.datasets[0]?.backgroundColor[index] }}
            ></div>
            <span className="text-sm">{item}</span>
          </div>
          <span className="text-xs">
            Rp {data?.datasets[0]?.data[index].toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};
