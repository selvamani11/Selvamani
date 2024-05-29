import React from 'react';

const TransactionTable = ({ transactions, onTransactionClick }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions available.</p>;
  }

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr
            key={transaction.TransactionID}
            onClick={() => onTransactionClick(transaction)}
            style={{ cursor: 'pointer' }}
            title={`Date: ${transaction.Date}, Time: ${new Date(transaction.Date).toLocaleTimeString()}`}
          >
            <td>{transaction.TransactionID}</td>
            <td>{transaction.Amount}</td>
            <td>{transaction.Date}</td>
            <td>{transaction.Description}</td>
            <td>{transaction.Status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
