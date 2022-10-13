import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';
import axios from 'axios';


const initialState = JSON.parse(sessionStorage.getItem('transactions')) || []



export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [ transactions,dispatch] = useReducer(contextReducer, initialState);

    //Action Creators
    // async function deleteTransaction(id) {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //           'auth-token':localStorage.getItem('token')
    //         }
    //       }
        
    //       await axios.delete(`https://fintrackbackend-production-89dd.up.railway.app/api/v1/transactions/${id}`,config);
    
    //       dispatch({
    //         type: 'DELETE_TRANSACTION',
    //         payload:id
    //       });
      
    //   }
    


    const deleteTransaction = (id) => {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id })
  }
      async function addTransaction(transaction) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
        }
    const res = await axios.post('https://fintrackbackend-production-89dd.up.railway.app/api/v1/transactions', transaction, config);
    
          dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
          });
        }


        async function getTransactions() {
            const config = {
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token':localStorage.getItem('token')
                }
              }
          
              const res = await axios.get('https://fintrackbackend-production-89dd.up.railway.app/api/v1/transactions',config);
            
              dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data
              });
            
          }


          

    const balance = transactions.reduce((acc, currVal) => (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount), 0);

    console.log(transactions);

  

    return (
        <ExpenseTrackerContext.Provider value={{
            getTransactions,
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}