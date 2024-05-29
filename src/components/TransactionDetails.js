import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TransactionDetails = ({ transaction, onClose }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: ['Amount'],
      datasets: [{
        label: 'Transaction Amount',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [transaction.Amount]
      }]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });

    return () => {
      myChart.destroy();
    };
  }, [transaction.Amount]);

  const isRejected = transaction.Status === 'Rejected';
  const isSuccess = transaction.Status === 'Payment Successfully';

  return (
    <div className={`side-dashboard ${isRejected ? 'rejected' : isSuccess ? 'success' : ''}`}>
      <div className="dashboard-header">
        <h2>Transaction Details</h2>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <p>Transaction ID: {transaction.TransactionID}</p>
      <p>Amount: {transaction.Amount}</p>
      <p>Date: {transaction.Date}</p>
      <p>Description: {transaction.Description}</p>
      <p>Status: <b>{transaction.Status}</b></p>
      <canvas ref={chartRef} width={400} height={300}></canvas>
    </div>
  );
};

export default TransactionDetails;