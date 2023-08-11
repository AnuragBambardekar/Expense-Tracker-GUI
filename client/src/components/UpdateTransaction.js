import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const EditTransactionPopup = ({ transaction, onClose }) => {
        const { updateTransaction } = useContext(GlobalContext);
        const { transactions, getTransactions } = useContext(GlobalContext);

        const [editedText, setEditedText] = useState(transaction.text);
        const [editedAmount, setEditedAmount] = useState(transaction.amount);

        const handleSave = () => {
            
            const updatedTransaction = {
                ...transaction,
                text: editedText,
                amount: editedAmount,
            };

            updateTransaction(updatedTransaction);         
            onClose();

            window.alert('Transaction updated successfully');
            getTransactions();
    };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Transaction</h2>
            
            <input
            type="text"
            placeholder="Text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            />
            <input
            type="number"
            placeholder="Amount"
            value={editedAmount}
            onChange={(e) => setEditedAmount(parseFloat(e.target.value))}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
        
      </div>
    </div>
    
  );
};

export default EditTransactionPopup;
