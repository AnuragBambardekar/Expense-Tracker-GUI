# Expense Tracker App

## Project Logs
- ```npx create-react-app expense-tracker-app```
- Installed the VSCode Extension: ES7 React/Redux/GraphQL/React-Native snippets
- create components folder inside src -> create Header.js file
- type 'rafc' in header.js -> it will give us a functional component to work with
- Import Header.js in App.js
- Create rest of the components and include it in App.js
- Add extension: React DevTools in Chrome to inspect React Components
- React Context folder created with GlobalState and AppReducer files in it for managing global state that needs to be shared and accessed by multiple components throughout the application.

    ### Code Explanation (GlobalState.js and AppReducer.js)
    initialState: This is an object that represents the initial state of the application. It contains a transactions array with some sample transaction objects, each having an id, text, and amount property. This will serve as the starting point for the application's state.

    createContext: This function is used to create a new React context called GlobalContext. The initialState object is passed as the default value for this context, which means any component that consumes this context will have access to the transactions array in their initial state.

    GlobalProvider: This is a custom component that acts as the provider for the GlobalContext. It wraps its child components and makes the global state available to them via the GlobalContext.Provider. Within this component, the useReducer hook is used to create a state management mechanism with a reducer function called AppReducer. The AppReducer is responsible for handling state updates based on dispatched actions.

    value prop in the GlobalContext.Provider: Here, the transactions array from the state managed by useReducer is exposed through the context, making it accessible to all the child components that consume this context.

    **The Global Context (created with createContext) serves as a way to declare a "global store" for your application's state. It allows components to consume the state without having to pass it down through prop drilling. However, just having the context without a provider would mean that you don't have a way to manage and update the state effectively.**

    **The Global Provider, on the other hand, is a component that wraps your application (or parts of it) and acts as a container for the global state. It is responsible for providing the state and methods to update the state to all the child components that consume the context.**

    **By using the Global Provider with useReducer (or other state management techniques like useState or Redux), you have a mechanism to handle state updates and maintain a single source of truth for the entire application. The provider holds the state and dispatch function (for updating the state), and it makes them available through the context.**

- Added GlobalContext to TransactionList.js
- Made Transaction.js so that it can be used as a component in TransactionList.js