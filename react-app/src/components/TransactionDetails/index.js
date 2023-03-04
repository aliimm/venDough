import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSpecficTransaction } from '../../store/transactions'
import './transactiondetails.css'
import moment from 'moment'


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


const TransactionDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [users, setUsers] = useState([])


    useEffect(() => {
        dispatch(getSpecficTransaction(id))

        if (!users.length) {

            async function fetchData() {
                const response = await fetch('/api/users/')
                const responseData = await response.json()
                setUsers(responseData.users)
            }
            fetchData()
        }

    }, dispatch)

    const specificTransaction = useSelector(state => state.transactions.singleTransaction)
    console.log(specificTransaction)

    if (!specificTransaction) return null


    return (
        <div className='details-container-transaction'>
            <div className='transaction-div'>
                <div><img className='image-avi-alltransactions' src={users?.find(user => user?.id === specificTransaction?.sender_id)?.profile_photo}></img></div>
                <div className='paid-message-and-notes-details'>
                    <div className='paid-message-details'><p><b>{users.find(user => user?.id === specificTransaction?.sender_id)?.first_name} {users.find(user => user?.id === specificTransaction?.sender_id)?.last_name}</b><span> paid</span> <b>{users?.find(user => user.id == specificTransaction?.recipient_id)?.first_name} {users?.find(user => user.id == specificTransaction?.recipient_id)?.last_name}</b></p></div>
                    <div>
                        {moment(specificTransaction.created_at).fromNow()} <i className="fa-solid fa-earth-americas"></i>
                    </div>

                    <div className='transaction-message'>{specificTransaction.message}</div>
                </div>
            </div>

        </div>
    )
}

export default TransactionDetails
