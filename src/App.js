import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import TransactionTable from './components/TransactionTable';
import TransactionDetails from './components/TransactionDetails';
import TransactionChart from './components/TransactionChart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions`);
        const sortedTransactions = response.data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        setTransactions(sortedTransactions);
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

  const handleToggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="App">
      <div className="table-container">
      <div className="toggle-chart-icon" onClick={handleToggleChart}>
      <div className="dashboard-header">
      <h2>Transaction History</h2>
          <FontAwesomeIcon icon={faChartLine} size="2x" />
        </div>
        </div>
        <TransactionTable transactions={transactions} onTransactionClick={handleTransactionClick} />
      </div>
      {showDetails && (
        <TransactionDetails transaction={selectedTransaction} onClose={handleClose} />
      )}
      {showChart && (
        <TransactionChart transactions={transactions} />
      )}
    </div>
  );
};

export default App;
