import { useContext, useEffect } from 'react'; //is we are using some HTTP request from a component, you want to use useEffect
import React from 'react'
import Transaction from './Transaction'
import { GlobalContext } from '../context/GlobalState'

const TransactionList = () => {

  // const context = useContext(GlobalContext);
  // console.log(context);

  const {transactions, getTransactions} = useContext(GlobalContext); // Destructuring

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction._id} transaction={transaction}/>
        ))}
        
      </ul>
    </>
  )
}

export default TransactionList
