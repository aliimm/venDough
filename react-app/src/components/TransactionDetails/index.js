import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSpecficTransaction } from '../../store/transactions'

const TransactionDetails = () => {
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpecficTransaction(id))

    })


  return (
    <div>TransactionDetails</div>
  )
}

export default TransactionDetails
