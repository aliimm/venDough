import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllTransactions } from '../../store/transactions';
import moment from 'moment'
import { deleteATransaction } from '../../store/transactions';
import './transaction.css'
import { NavLink, useHistory } from 'react-router-dom';
import { postALike } from '../../store/likes';

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
  const history = useHistory()
  // const history = useHistory()
  const transactionsO = useSelector(state => state?.transactions?.transactions)
  const likessession = useSelector(state => state?.likes?.likes)

  const likesarray = Object.values(likessession)
  console.log(likessession)
  const likerrr = likesarray[0]

  // const transactionsO = useSelector(state => state?.transactions?.transactions)
  const sessionuser = useSelector(state => state?.session.user?.username)
  const sessionuserId = useSelector(state => state?.session.user?.id)
  console.log(sessionuserId)
  const transactionValues = Object.values(transactionsO)
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([])
  const [likes, setLikes] = useState([])



  const handleLike = async (transaction_id) => {

    const payload = {
      'users': Number(sessionuserId),
      'transactions': transaction_id
    }
    return dispatch(postALike(payload, transaction_id))
  }

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


  }, [dispatch, likerrr, likesarray[1]])



  const TransactionDelete = async (transactionId) => {
    return dispatch(deleteATransaction(transactionId))
      // .then(() => history.push('/'))
      .catch(
        async (res) => {
          if (!res.ok) {
            const data = await res.json();
            if (data.message.includes('Authentication required')) setErrors(['Need to be signed in to make or delete a review'])
            else if (data && data.errors) setErrors(data.errors);
            else if (data && data.message) setErrors([data.message])

          }



        }
      );

  }




  // if(!!sessionuserId) return null
  if (!transactionsO) return null

  // const selectedUser = users.find(user => user.username === transaction.sender_id)
  //transaction.recipient_id
  // console.log(users.find(user => user.id === 1).first_name)
  return transactionsO && (
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
              <button className='user-liked-transaction' onClick={() => handleLike(transaction.id).then(() => dispatch(getAllTransactions()))}><i class="fa-solid fa-heart fa-lg"></i>

              {transaction?.likes?.length ?
               <> {transaction?.likes?.length}</> :
               <></>
              }
              </button>

              <button className='comment-button-transaction-all' onClick={() => history.push(`/${transaction.id}/transaction`)}><i class="fa-solid fa-comment fa-lg"></i></button>
              {sessionuserId === transaction.sender_id &&
                <div>
                  <button className='Revert-transaction-button' onClick={() => TransactionDelete(transaction.id)}>Revert Transaction</button>

                </div>

              }

            </div>
          </div>
        ))

        }


      </div>

    </div>

  )
}

export default AllTransaction
