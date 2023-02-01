import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllTransactions } from '../../store/transactions';
import './transaction.css'
import moment from 'moment'
// import {getCurrentDate} from './utils'

moment.updateLocale("en", {
  relativeTime: {
    future: (diff) => (diff === "just now" ? diff : `in ${diff}`),
    past: (diff) => (diff === "just now" ? diff : `${diff}`),
    s: "just now",
    ss: "just now",
    m: "1 minute",
    mm: "%d min",
    h: "1 hr",
    hh: "%d hrs",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

const AllTransaction = () => {
  const dispatch = useDispatch()
  const transactionsO = useSelector(state => state.transactions.transactions)
  const transactionValues = Object.values(transactionsO)
  const [users, setUsers] = useState([])

  useEffect(() => {
    dispatch(getAllTransactions())

    if (!users.length) {

      async function fetchData() {
        const response = await fetch('/api/users/')
        const responseData = await response.json()
        setUsers(responseData.users)
      }
      fetchData()
    }

  }, [], [dispatch])


  // const selectedUser = users.find(user => user.username === transaction.sender_id)
  //transaction.recipient_id
  // console.log(users.find(user => user.id === 1).first_name)
  return (
    <div className='transaction-container'>
      <div className='all-transactions-div'>
        {transactionValues.reverse().map(transaction => (
          <div className='transaction-div'>
            <div><img className='image-avi-alltransactions' src={users?.find(user => user?.id === transaction?.sender_id)?.profile_photo}></img></div>
            <div className='paid-message-and-notes'>
              <div className='paid-message'><p><b>{users.find(user => user?.id === transaction?.sender_id)?.first_name} {users.find(user => user?.id === transaction?.sender_id)?.last_name}</b><span> paid</span> <b>{users?.find(user => user.id == transaction?.recipient_id)?.first_name} {users?.find(user => user.id == transaction?.recipient_id)?.last_name}</b></p></div>

              <div>
                {moment(transaction.created_at).fromNow()} <i className="fa-solid fa-earth-americas"></i>
              </div>

              <div className='transaction-message'>{transaction.message}</div>
            </div>
          </div>
        ))

        }


      </div>

    </div>

  )
}

export default AllTransaction
