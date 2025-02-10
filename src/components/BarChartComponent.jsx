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
const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical" // ✅ Makes the bars horizontal
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" /> {/* X-axis is numerical */}
        <YAxis dataKey="name" type="category" /> {/* Y-axis is categorical */}
        <Tooltip />
        <Bar dataKey="value" fill="purple" barSize={30} /> {/* Purple bars */}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
