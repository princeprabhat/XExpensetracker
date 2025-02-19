// import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = ["#ff9304", "#fde006", "#B5DC52", "#89E148"];
const PieChartComp = ({ expData }) => (
  <ResponsiveContainer width="100%" height={350}>
    <PieChart>
      <Pie
        data={expData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        // fill="#ffffff"
        dataKey="value"
        nameKey="name"
      >
        {expData &&
          expData?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
      </Pie>
      <Tooltip />
      <Legend
        iconType="rect"
        iconSize={18}
        wrapperStyle={{
          fontSize: "17px",
          fontWeight: "500",
        }}
      />
    </PieChart>
  </ResponsiveContainer>
);

export default PieChartComp;
