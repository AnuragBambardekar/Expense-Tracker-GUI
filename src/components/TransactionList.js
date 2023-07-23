import { useContext } from 'react'
import React from 'react'
import Transaction from './Transaction'
import { GlobalContext } from '../context/GlobalState'

const TransactionList = () => {

  // const context = useContext(GlobalContext);
  // console.log(context);

  const {transactions} = useContext(GlobalContext); // Destructuring

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction}/>
        ))}
        
      </ul>
    </>
  )
}

export default TransactionList
