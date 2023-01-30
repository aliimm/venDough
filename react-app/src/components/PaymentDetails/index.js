import React from 'react'
import { getOnePayment } from '../../store/methods';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './details.css'


const PaymentDetails = () => {
    const dispatch = useDispatch();
    const cardInfo = useSelector(state => state.methods.onePaymentMethod.method)

    console.log(cardInfo)

    const { id } = useParams()
    console.log(id)


    useEffect(() => {
        dispatch(getOnePayment(id))

    }, [id, dispatch])


    if (!cardInfo) return null



    return (
        <div className='specifcpaymentcontainer'>
            <div className='virtual-card'>
                <div className='card-info-container'>
                    <div className='bank-name-virutal-card'>Chase</div>
                    <div className='image-div-container'>
                        <div className='creditcardlastfour'>Debit · •• {cardInfo.card_number.substr(-4)}</div>
                        <div className='single-image-div'>
                            <img className='virtual-visa' src='https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg'></img>
                        </div>

                    </div>
                </div>
            </div>
            <div className='sending-money'>
                <p className='sendingMoney-text'>Sending money to friends</p>
                <p className='no-fee-text'>No Fee</p>
            </div>
            <div className='purchases-div'>
                <p className='purchases-text'>Purchases</p>
                <p className='no-fee-text'>No Fee</p>

            </div>

            <button className='edit-button'>Edit</button>


            <button className='Remove-button'>Remove</button>



        </div>
    )
}

export default PaymentDetails
