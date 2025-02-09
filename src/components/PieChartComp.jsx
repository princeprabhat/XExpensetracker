// import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// const data = [
//   { name: "Javascript", value: 40 },
//   { name: "Python", value: 30 },
//   { name: "Java", value: 50 },
//   { name: "PHP", value: 10 },
// ];
const colors = ["#ff9304", "#fde006", "#B5DC52", "#89E148"];
const PieChartComp = ({ expData }) => (
  <PieChart width={300} height={300}>
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
);

export default PieChartComp;
