import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createMethod } from "../../store/methods";
import { useModal } from '../../context/Modal';
import './postpayment.css'



function CreatePaymentModal() {
    const history = useHistory()
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.session.user.id)
    const [validationErrors, SetvalidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const [card_number, setCard_Number] = useState('')
    const [expiration, setExpiration] = useState('')
    const [cvv, setCvv] = useState('')
    const [errors, setErrors] = useState([]);

    const { closeModal } = useModal();

    console.log(card_number.length)
    useEffect(() => {
        const errors = []
        if (card_number.length !== 16) errors.push('Credit Card needs to be 16 digits')



        SetvalidationErrors(errors)
    }, [card_number])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true);
        if (validationErrors.length) return alert('Cannot Submit');
        setErrors([])

        const formData = {
            card_number: card_number,
            expiration: expiration,
            cvv: cvv,
        }


        const test = await dispatch(createMethod(formData, userId))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                    if (data && data.message) setErrors([data.message])
                })

        if (test) {
            closeModal()
            history.push('/')

        }
    }
console.log(new Date().toLocaleString().split(',')[0])
    // const date = (new Date(Date.now()).toISOString())

    return (
        <>
            <form className="add-card-form-container" onSubmit={handleSubmit} >
                <h1 className="title-add-card">Add Your Card</h1>
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
                    <div className="form-elements">
                        <div className="padding-div">
                            <input
                                className='form-box-login'
                                type='number'
                                onChange={(e) => setCard_Number(e.target.value)}
                                value={card_number}
                                placeholder='Card Number'
                                name="Card Number"
                            // min={1000000000000000}

                            />
                        </div>
                        <div className="padding-div">
                            <input
                                className='form-box-login'
                                type='date'
                                onChange={(e) => setExpiration(e.target.value)}
                                value={expiration}
                                required
                                placeholder='Expiration Date'
                                name='Expiration Date'
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="padding-div">
                            <input
                                className='form-box-login'
                                type='number'
                                onChange={(e) => setCvv(e.target.value)}
                                value={cvv}
                                required
                                placeholder='CVV'
                                name='CVV'
                                min={100}
                                max={999}
                            />
                        </div>
                    </div>
                    <div className='submit-button-div'>
                        <button className='sign-in-button' type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}
export default CreatePaymentModal
