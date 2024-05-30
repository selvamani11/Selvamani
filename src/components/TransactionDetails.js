import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ChartDataLabels from 'chartjs-plugin-datalabels';


const TransactionDetails = ({ transaction, onClose }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.5)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)');

    const sign = transaction.Type === 'Debit' ? '-' : '+';

    const chartData = {
      labels: ['Amount'],
      datasets: [{
        label: 'Transaction Amount',
        backgroundColor: gradient,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        data: [transaction.Amount],
        borderRadius: 10 ,
        borderSkipped: false
      }]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: transaction.Amount * 1.2
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
        // title: {
        //   display: true,
        //   text: `Transaction Date: ${transaction.Date}`
        // }
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
  }, [transaction.Amount]);

  const isRejected = transaction.Status === 'Failed';
  const isSuccess = transaction.Status === 'Completed';
  const isPending = transaction.Status === 'Pending';
  const isDebit = transaction.Type === 'Debit';
  const isCredit = transaction.Type === 'Credit'

  const sign = isDebit ? '-' : '+';

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
      <p className={`${isDebit ? 'debit' : isCredit ? 'credit' : ''}`}>{sign}Rs.{transaction.Amount}</p>
      <p>{transaction.Type}</p>
      <p>{transaction.Description}</p>
      <p>
          <b className={`${isRejected ? 'rejected' : isSuccess ? 'success' : isPending ? 'pending' : ''}`}>
            {transaction.Status}
            {isRejected && <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'red', marginLeft: '5px' }} />}
            {isSuccess && <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '5px' }} />}
            {isPending && <FontAwesomeIcon icon={faClock} style={{ color: 'orange', marginLeft: '5px' }} />}
          </b>
        </p>
      </div>
      <div style={{ width: '100%', height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default TransactionDetails;