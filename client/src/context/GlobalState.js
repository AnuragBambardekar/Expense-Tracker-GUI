import React, { createContext, useReducer } from "react";
import AppReducer from './AppReducer'
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
    transactions: []
}

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // actions that make calls to reducer
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>)
}