import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ exPData }) => {
  const chartData = [];

  // TopExpense → If two or more entries have the same title, merge them by adding their prices. No duplicate data should exist in topExpenses.

  const addSame = new Map();
  exPData.forEach((element) => {
    addSame.set(
      element.title,
      (addSame.get(element.title) || 0) + Number(element.price)
    );
  });
  for (let [key, value] of addSame) {
    chartData.push({ title: key, price: value });
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        layout="vertical"
        data={chartData
          .sort((val1, val2) => Number(val2.price) - Number(val1.price))
          .slice(0, exPData.length > 4 ? 5 : exPData.length)}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" />
        <YAxis dataKey="title" type="category" />
        <Tooltip />
        <Bar dataKey="price" fill="purple" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
