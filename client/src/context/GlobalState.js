import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer'
import axios from 'axios';
/**
 * Context in React allows you to pass data through the component tree without having to pass props down manually at every level. 
 * It provides a way to share data between components without the need for intermediate components to pass the data down.
 * Context is typically used when some state or data needs to be accessible to many components at different levels in the component tree.
 */

/**
 * useReducer takes a reducer function and an initial state as arguments and returns the current state and a dispatch function to trigger state updates.
 */

// initial state
// const initialState = {
//     transactions: [
//             { id: 1, text: 'Flower', amount: -20 },
//             { id: 2, text: 'Salary', amount: 300 },
//             { id: 3, text: 'Book', amount: -10 },
//             { id: 4, text: 'Camera', amount: 150 }
//     ]
// }

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // actions that make calls to reducer
    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions'); // fetch transactions from the backend
            // res.data.data will give us the actual data

            // dispatch getTransactions to the reducer with data as the payload
            dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction(transaction) {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        // console.log(transaction);
    
        try {
          const res = await axios.post('/api/v1/transactions', transaction, config);
    
          dispatch({
            type: 'ADD_TRANSACTION',
            payload: res.data.data
          });
        } catch (err) {
          dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
          });
        }
    }

    async function updateTransaction(transaction) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }

        // console.log("YO",transaction)
        const { _id, text, amount } = transaction;
        // console.log(_id)
        // console.log(text)
        // console.log(amount)
        const transactionData = {text, amount};

        try {
            const res = await axios.put(`/api/v1/transactions/${_id}`, transactionData, config);

            dispatch({
            type: 'UPDATE_TRANSACTION',
            payload: res.data.data
            });
        } catch (err) {
            dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
            });
        }
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
        updateTransaction,
    }}>
        {children}
    </GlobalContext.Provider>)
}