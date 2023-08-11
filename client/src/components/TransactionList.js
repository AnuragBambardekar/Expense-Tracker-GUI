import { useContext, useEffect, useState } from 'react';
import React from 'react';
import Transaction from './Transaction';
import { GlobalContext } from '../context/GlobalState';

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);
  console.log(transactions);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const transactionsToDisplay = transactions.slice(startIndex, endIndex);
    setDisplayedTransactions(transactionsToDisplay);

    // console.log('Displayed Transactions:', transactionsToDisplay);
  }, [currentPage, transactions]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {displayedTransactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= transactions.length}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TransactionList;
