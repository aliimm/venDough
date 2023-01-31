import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllTransactions } from '../../store/transactions';
import './transaction.css'


const AllTransaction = () => {
  const dispatch = useDispatch()
  const transactionsO = useSelector(state => state.transactions.transactions)
  const transactionValues = Object.values(transactionsO)
  console.log("alkdjf", transactionValues)

  useEffect(() => {
    dispatch(getAllTransactions())

  }, [dispatch])


  return (
    <div className='transaction-container'>
      <div className='all-transactions-div'>
        {transactionValues.map(transaction => (
          <div className='transaction-div'>
            <div className='paid-message'><h4>{transaction.sender_id} paid {transaction.recipient_id}</h4></div>
            <div>{transaction.message}</div>
          </div>
        ))

        }


      </div>

    </div>

  )
}

export default AllTransaction
