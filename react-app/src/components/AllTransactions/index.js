import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllTransactions } from '../../store/transactions';
import './transaction.css'


const AllTransaction = () => {
  const dispatch = useDispatch()
  const transactionsO = useSelector(state => state.transactions.transactions)
  const transactionValues = Object.values(transactionsO)
  const [users, setUsers] = useState([])

  useEffect(() => {
    dispatch(getAllTransactions())

    if(!users.length){

      async function fetchData() {
        const response = await fetch('/api/users/')
        const responseData = await response.json()
        setUsers(responseData.users)
      }
      fetchData()
    }

  }, [], [dispatch])

  console.log(users)
  // const selectedUser = users.find(user => user.username === transaction.sender_id)
//transaction.recipient_id
  // console.log(users.find(user => user.id === 1).first_name)
  return (
    <div className='transaction-container'>
      <div className='all-transactions-div'>
        {transactionValues.map(transaction => (
          <div className='transaction-div'>

            <div className='paid-message'><h4>{users.find(user => user.id === transaction.sender_id).first_name} paid {users?.find(user => user.id == transaction?.recipient_id)?.first_name}</h4></div>
            <div>{transaction.message}</div>
          </div>
        ))

        }


      </div>

    </div>

  )
}

export default AllTransaction
