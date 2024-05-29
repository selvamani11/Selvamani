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

  const isRejected = transaction.Status === 'Failed';
  const isSuccess = transaction.Status === 'Completed';
  const isPending = transaction.Status === 'Pending';
  const isDebit = transaction.Type === 'Debit';
  const isCredit = transaction.Type === 'Credit'

  return (
    <div className="side-dashboard">
      <div className="dashboard-header">
        <h2>Transaction Details</h2>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div style={{ marginLeft: "20px"}}>
      {/* <p>Transaction ID: {transaction.TransactionID}</p> */}
      <p>{transaction.Date},{transaction.Time}</p>
      <p className={`${isDebit ? 'debit' : isCredit ? 'credit' : ''}`}>Rs.{transaction.Amount}</p>
      <p>{transaction.Type}</p>
      <p>{transaction.Description}</p>
      <p><b className={`${isRejected ? 'rejected' : isSuccess ? 'success'  : isPending ? 'pending' : ''}`}>{transaction.Status}</b></p>
      </div>
      <canvas ref={chartRef} width={400} height={300}></canvas>
    </div>
  );
};

export default TransactionDetails;