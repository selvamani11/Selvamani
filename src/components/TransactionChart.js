import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const TransactionChart = ({ transactions }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Aggregate amounts by date
    const dateAmounts = transactions.reduce((acc, transaction) => {
      const date = transaction.Date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.Amount;
      return acc;
    }, {});

    const labels = Object.keys(dateAmounts);
    const data = Object.values(dateAmounts);

    const chartData = {
      labels,
      datasets: [{
        label: 'Transaction Amount',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        data,
        borderRadius: 10,
        borderSkipped: false
      }]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(...data) * 1.2
        },
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'top',
          formatter: (value) => `Rs. ${value}`,
          font: {
            weight: 'bold'
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => `Rs. ${context.raw}`
          }
        },
        title: {
          display: true,
          text: 'Transaction Amounts by Date'
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };

    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
      plugins: [ChartDataLabels]
    });

    return () => {
      myChart.destroy();
    };
  }, [transactions]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TransactionChart;
