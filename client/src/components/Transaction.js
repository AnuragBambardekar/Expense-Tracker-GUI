import { useContext, useState } from 'react';
import React from 'react'
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import UpdateTransaction from './UpdateTransaction';
import editImage from '../images/edit.png';
import deleteImage from '../images/delete.png';

const Transaction = ({ transaction }) => {

    // Delete Transaction
    const { deleteTransaction } = useContext(GlobalContext);
    
    // Edit Transaction
    const [isEditing, setIsEditing] = useState(false);
    const openEditPopup = () => {
        setIsEditing(true);
    };
    const closeEditPopup = () => {
        setIsEditing(false);
    };

    const sign = transaction.amount < 0 ? '-':'+';
    return (
        <li className={transaction.amount < 0 ? 'minus':'plus'}>
            {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction._id)}>
                <img src={deleteImage} alt='Delete' style={{ width: '17px', height: '17px' }}/>
            </button>
            
            {/* <button className="edit-btn" onClick={() => deleteTransaction(transaction._id)}>Edit</button> */}

            <button className="edit-btn" onClick={openEditPopup}>
                <img src={editImage} alt='Edit' style={{ width: '17px', height: '17px' }}/>
            </button>
            {isEditing && (
                <UpdateTransaction transaction={transaction} onClose={closeEditPopup} />
            )}
        </li>
    )
}

export default Transaction
