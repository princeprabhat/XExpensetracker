import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Item A", value: 400 },
  { name: "Item B", value: 300 },
  { name: "Item C", value: 500 },
  { name: "Item D", value: 200 },
];
// TODO: Add data to barchart component and remove x axis number line
const BarChartComponent = ({ exPData }) => {
  const chartData = exPData
    .map((val) => ({
      name: val.title,
      value: val.price,
    }))
    .sort((val1, val2) => Number(val2.value) - Number(val1.value))
    .slice(0, exPData.length > 4 ? 5 : exPData.length);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Bar dataKey="value" fill="purple" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
