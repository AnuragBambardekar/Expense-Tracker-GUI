// export default (state, action) => {
//     switch(action.type) {
//         case 'DELETE_TRANSACTION':
//             return {
//                 ...state,
//                 transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
//             }
//         case 'ADD_TRANSACTION':
//             return {
//                 ...state, // data is being stored in state
//                 transactions: [action.payload,...state.transactions]
//             }
//         default:
//             return state;
//     }
// }

const transactionReducer = (state, action) => {
    switch(action.type) {
        case 'GET_TRANSACTION': // here in the reducer after fetching the data from the backend, it changes the state and passed down to the components
            return {
                ...state,
                loading: false, // means that the transactions were fetched
                transactions: action.payload
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case 'TRANSACTION_ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default transactionReducer;
