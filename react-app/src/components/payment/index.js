import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllPayment } from '../../store/methods';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import './paymentpage.css'



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

    if (!allPayments) return null
    const allpayment = Object.values(allPayments)


    return (
        <div className='div-payment'>
            <div className='payment-method-title' style={{ fontFamily: 'Athletics Regular' }}>Payment Methods</div>
            <div className='All-cards'>
                {allpayment.map(card => (
                    <NavLink to= {`/${card.id}/payment-method-details`}>
                        <div className='specific-card'>
                            <img className='visaimg' src='https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg'></img>
                            <div className='bank-with-lastfour'>
                                <div className='BankName'>Chase </div>
                                <div className='lastfourcard'>  Debit · ••{card.card_number.substr(-4)}</div>
                            </div>
                        </div>
                    </NavLink>

                ))
                }
            </div>
            <h1>'@@####'</h1>
        </div>
    )


}
export default PaymentMethods
