import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

const AddTransaction = () => {

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  const { addTransaction } = useContext(GlobalContext);
  const { transactions, getTransactions } = useContext(GlobalContext);
  

  const onsubmit = e => {
    e.preventDefault();

    const newTransaction = {
      // _id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction);
    getTransactions();

    // Clear text and amount fields
    setText('');
    setAmount('');

    // Show the popup
    setShowPopup(true);

    // Hide the popup after a delay
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  }

  return (
    <>
        <h3>Add new transaction</h3>
        <form onSubmit={onsubmit}>
            <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
            </div>
            <div className="form-control">
                <label htmlFor="amount">Amount <br />(negative - expense, positive - income)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
            </div>
            <button className="btn">Add transaction</button>
        </form>

        {showPopup && (
          <div className="popup">
            Transaction added successfully!
          </div>
        )}
    </>
  )
}

export default AddTransaction
