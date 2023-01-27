import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllPayment } from '../../store/methods';
import { useParams, useHistory, NavLink } from 'react-router-dom';




const PaymentMethods = () => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const userId = useSelector(state => state.session.user.id)
    const allPayments = useSelector(state => state.methods.methods)
    // // console.log("asdfas", allPayments)
    // console.log(allpayment)
    // console.log('@@@@', allpayment)

    useEffect(() => {
        dispatch(getAllPayment(id))

    }, [userId, dispatch])

    // if(!allpayment) return null


    if(!allPayments) return null
    const allpayment = Object.values(allPayments)

    return (
        <div>
            <div>
                {allpayment.map(card => (
                    <div>Card Number: {card.card_number}</div>

                    
                ))
                }
            </div>
            <h1>'@@####'</h1>
        </div>
    )


}
export default PaymentMethods
