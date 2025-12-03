import React from 'react'
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";



Chart.register(ArcElement, Tooltip, Legend);

export const LineCart = () => {
  return (
    <div>
        <Doughnut data={data} options={options} plugins={[centerText]} />
    </div>
  )
}
