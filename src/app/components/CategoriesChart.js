"use client";

import * as React from 'react';
import { useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';

export default function CategoriesChart() {
  const expenses = useSelector((state) => state.expenses.expensesData);

  if (!expenses || expenses.length === 0) {
    return (
      <div className="w-full py-10 flex justify-center items-center">
        <p className="text-gray-500 text-sm">No expenses data available.</p>
      </div>
    );
  }

  const chartData = expenses.map((item, index) => ({
    id: index,
    value: item.amount,
    label: item.name,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full flex justify-center items-center">
      <PieChart
        width={280}
        height={280}
        series={[
          {
            data: chartData,
            innerRadius: 50,
            outerRadius: 120,
            paddingAngle: 3,
            cornerRadius: 6,
          },
        ]}
      />
    </div>
  );
}
