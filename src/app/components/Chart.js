'use client';
import { Chart } from 'chart.js/auto';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import useTheme from '@/context/theme';

export default function DataChart() {
  const chartRef = useRef(null);
  const authStatus = useSelector((state) => state.auth.status);
  const { theme: mode } = useTheme();
  const expenses = useSelector((state) => state.expenses.expensesData);

  useEffect(() => {
    if (!expenses || expenses.length === 0) return;

    const labels = expenses.slice(-4).map(item => item.date);
    const amount = expenses.slice(-4).map(item => parseFloat(item.amount));
    const ctx = chartRef.current.getContext('2d');
const newLabels = labels.map(date =>
  date ? new Date(date).toISOString().split("T")[0] : "N/A"
);

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: newLabels,
        datasets: [{
          label: 'Expenses',
          data: amount,
          backgroundColor: mode === 'dark'
            ? 'rgba(255, 191, 0, 0.4)'
            : 'rgba(255, 191, 0, 0.3)',
          borderColor: mode === 'dark'
            ? 'rgba(255, 191, 0, 0.4)'
            : 'rgba(255, 191, 0, 0.3)',
          borderWidth: 1,
          borderRadius: 5,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: mode === 'dark' ? 'rgba(255, 191, 0, 0.4)' : 'rgba(255, 191, 0, 0.3)'
            },
            ticks: {
              color: mode === 'dark' ? '#000' : '#8c8c8c'
            }
          },
          x: {
            grid: {
              color: mode === 'dark' ? 'rgba(255, 191, 0, 0.4)' : 'rgba(255, 191, 0, 0.3)'
            },
            ticks: {
              color: mode === 'dark' ? '#000' : '#8c8c8c'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: mode === 'dark' ? '#8c8c8c' : '#fff'
            }
          }
        }
      }
    });

    return () => chart.destroy();
  }, [expenses, mode]);

  return (
    <div className='w-full h-full mt-5 mb-5 text-center '>
      {expenses && expenses.length > 0 ? (
        <canvas ref={chartRef} />
      ) : (
         <div className="flex flex-col items-center justify-center h-full max-w-full mx-auto bg-white rounded-2xl dark:bg-black p-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-12 h-12 text-amber-600 dark:text-amber-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
      <p className="mt-4 text-center text-sm text-black/50 dark:text-white/50">
           Start adding your expenses to visualize them here..
      </p>
    </div>
      )}
    </div>
  );
}
