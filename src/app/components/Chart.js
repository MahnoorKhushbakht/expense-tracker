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
    const labels = expenses.slice(-4).map(item => item.date);
    const amount = expenses.slice(-4).map(item => parseFloat(item.amount));
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Expenses',
          data: amount,
          backgroundColor: mode === 'dark'
            ? 'rgba(255, 191, 0, 0.4)'   // amber-200 for dark
            : 'rgba(255, 191, 0, 0.3)',    // amber-600 for light
          borderColor: mode === 'dark'
            ? 'rgba(255, 191, 0, 0.4)'     // amber-200 full
            : 'rgba(255, 191, 0, 0.3)',      // amber-600 full
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
              color: mode === 'dark'
                ? 'rgba(255, 191, 0, 0.4)'  // softer amber-200
                : 'rgba(255, 191, 0, 0.3)'    // softer amber-600
            },
            ticks: {
              color: mode === 'dark' ? '#000' : '#8c8c8c'
            }
          },
          x: {
            grid: {
              color: mode === 'dark'
                ? 'rgba(255, 191, 0, 0.4)'
                : 'rgba(255, 191, 0, 0.3)'
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
    <div className='w-full h-full'>
      
      <canvas ref={chartRef} />
    </div>
  );
}
