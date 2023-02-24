import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSpecficTransaction } from '../../store/transactions'

const TransactionDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getSpecficTransaction(id))
    }, dispatch)

    // const specificTransaction = useSelector(state => state)


  return (
    <div>TransactionDetails</div>
  )
}

export default TransactionDetails
