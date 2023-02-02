import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal';
import { updateACard } from "../../store/methods";
import './editmodalcard.css'



function EditPaymentModal() {

    const editpaymentSelector = useSelector((state) => state.methods.onePaymentMethod.method)
    // const testerrrr = Object.values(editpaymentSelector)
    const dispatch = useDispatch()
    const history = useHistory()
    const [newCardNumber, setCardNumber] = useState(editpaymentSelector.card_number)
    const [newExpirationDate, setExpirationDate] = useState(editpaymentSelector.expiration)
    const [newCvv, setCvv] = useState(editpaymentSelector.cvv)
    const [validationErrors, SetvalidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState([])

    const { closeModal } = useModal()

    const userId = editpaymentSelector.user_id
    const methodId = editpaymentSelector.id


    useEffect(() => {
        const errors = []
        if (newCardNumber.length !== 16) errors.push('needs to be 16 digits')



        SetvalidationErrors(errors)
    }, [newCardNumber])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        if (validationErrors.length) return alert('Cannot Submit');
        setErrors([])

        const payload = {
            "id": methodId,
            "user_id": userId,
            "card_number": newCardNumber,
            "expiration": newExpirationDate,
            "cvv": newCvv,
        }

        const test = dispatch(updateACard(payload, methodId))
            // .then(closeModal)
            .then(() => history.push(`/`))
            .catch(
                async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)
                }
            )
        if (test) {
            closeModal()

        }
        // .then(() => history.push(`/`))
    }


    return (

        <>
            <form className="add-card-form-container" onSubmit={handleSubmit} >
                <h1 className="title-add-card">Update Your Card</h1>
                <div>
                    {/* <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul > */}
                     <ul className="errors-pay-transaction">
                        {/* {validationErrors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))} */}
                        {hasSubmitted && validationErrors.length > 0 && (
                            <div>
                                The following errors were found:
                                <ul>
                                    {validationErrors.map(error => (
                                        <p className='specifc-errors-payform' key={error}>*{error}</p>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </ul >
                    <div className="form-elements-edit-card">
                        <label>
                            Card Number
                            <input
                                className='form-box-login'
                                type='number'
                                onChange={(e) => setCardNumber(e.target.value)}
                                value={newCardNumber}
                                placeholder='Card Number'
                                name="Card Number"
                            />
                        </label>
                        <label>
                            Expiration Date
                            <input
                                className='form-box-login'
                                type='date'
                                onChange={(e) => setExpirationDate(e.target.value)}
                                value={newExpirationDate}
                                required
                                placeholder='Expiration Date'
                                name='Expiration Date'
                            />
                        </label>
                        <label >
                            CVV
                            <input
                                className='form-box-login'
                                type='number'
                                onChange={(e) => setCvv(e.target.value)}
                                value={newCvv}
                                required
                                placeholder='CVV'
                                name='CVV'
                                min={100}
                                max={999}
                            />
                        </label>
                    </div>
                    <div>
                        <button className='sign-in-button' type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditPaymentModal
