import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import TransactionTable from './components/TransactionTable';
import TransactionDetails from './components/TransactionDetails';

const App = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`);
//             const data = await response.json();
//             setTransactions(data);
//         } catch (err) {
//             console.error('Error fetching transactions:', err);
//         }
//     };

//     fetchTransactions();
// }, []);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="App">
      <div className="table-container">
        <TransactionTable transactions={transactions} onTransactionClick={handleTransactionClick} />
      </div>
      {showDetails && (
        <TransactionDetails transaction={selectedTransaction} onClose={handleClose} />
      )}
    </div>
  );
};

export default App;
