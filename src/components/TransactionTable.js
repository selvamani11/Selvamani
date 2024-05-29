import React from 'react';

const TransactionTable = ({ transactions, onTransactionClick }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions available.</p>;
  }

  const isDebit = transactions.Type === 'Debit'
  const isCredit = transactions.Type === 'Credit'

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          {/* <th>Transaction ID</th> */}
          <th>Date</th>
          <th>Time</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr
            key={transaction.TransactionID}
            onClick={() => onTransactionClick(transaction)}
            style={{ cursor: 'pointer'}}
            title={`Date: ${transaction.Date}, Time: ${(transaction.Time)}`}
          >
            {/* <td>{transaction.TransactionID}</td> */}
            <td>{transaction.Date}</td>
            <td>{transaction.Time}</td>
            <td className={`${isDebit ? 'debit' : isCredit ? 'credit' : ''}`}>Rs.{transaction.Amount}</td>
            <td>{transaction.Status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
