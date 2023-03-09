import React from 'react'
import { getOnePayment } from '../../store/methods';
import { deleteAMethod } from '../../store/methods';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import EditPaymentModal from './EditPaymentModal';
import OpenModalButton from '../OpenModalButton';
import ProgressBar from "@badrap/bar-of-progress";
import './details.css'

const progress = new ProgressBar();


const PaymentDetails = () => {
    const dispatch = useDispatch();
    const cardInfo = useSelector(state => state.methods.onePaymentMethod?.method)
    // const cardInfo = useSelector(state => state.methods.onePaymentMethod?.method)

    const history = useHistory()



    const { id } = useParams()
    console.log(id)


    useEffect(() => {
        progress.start();

        dispatch(getOnePayment(id))

        setTimeout(() => {
            progress.finish();
          }, 1000);

    }, [id, dispatch])


    if (!cardInfo) return null
    const methodId = cardInfo.id

    let message = ''
    const handleDeletion = async () => {
        const response = await dispatch(deleteAMethod(methodId))
        .then(() => history.push(`/${cardInfo.user_id}/payment-methods`))
        console.log('message', message)
        if (response) {
            message = response.message
        }

    }




    return (
        <div className='specifcpaymentcontainer'>
            <div className='virtual-card'>
                <div className='card-info-container'>
                    <div className='bank-name-virutal-card'>Chase</div>
                        <div className='creditcardlastfour'>Debit · •• {cardInfo.card_number.substr(-4)}</div>
                        <div className='single-image-div'>
                            <img className='virtual-visa' src='https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg'></img>

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

            <div >

                <OpenModalButton
                    modalComponent={<EditPaymentModal />}

                    buttonText={'Update Card'} className='edit-button'
                />
            </div>






            <button onClick={() => handleDeletion()} className='Remove-button'>Remove</button>



        </div>
    )
}

export default PaymentDetails
